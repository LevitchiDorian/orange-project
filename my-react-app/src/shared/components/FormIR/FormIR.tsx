import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Form, Input, InputNumber, Select, message } from 'antd';
import { useDispatch } from 'react-redux'; // Import useDispatch from react-redux
import { useGetAllRestaurantsQuery, useGetLocationsByRestaurantIdQuery, useGetTablesByLocationIdQuery } from '../../../store/apiSlice';
import { useNavigate, useLocation } from 'react-router-dom';
import { AppRoutes } from '../../../app/Router';
import { setBookingDetails } from '../../../features/order/orderSlice'; // Import the setBookingDetails action

interface FormValues {
  name: string;
  phone: string;
  email: string;
  location: string;
  table: number;
  persons: number;
  preferences?: string;
}

const { Option } = Select;

const prefixSelector = (
  <Form.Item name="prefix" noStyle>
    <Select style={{ width: 90 }}>
      <Option value="373">+373</Option>
    </Select>
  </Form.Item>
);

const CustomButton = styled.button`
  background-color: #FFEFDD;
  color: #181a1b;
  border: 2px solid #FFEFDD;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 400;
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: #f9cc98;
    color: #181a1b;
    border-color: #f9cc98;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const FormIR: React.FC = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch(); // Initialize useDispatch
  const location = useLocation();
  const navigate = useNavigate();
  const { restaurantId } = location.state || {};
  const [selectedLocationId, setSelectedLocationId] = useState<number | null>(null);
  const [hasAvailableTable, setHasAvailableTable] = useState<boolean | null>(null);

  // Fetch all restaurants and locations data
  const { data: restaurantData, isLoading: isRestaurantLoading } = useGetAllRestaurantsQuery({
    categoryIds: [],
    restaurantName: '',
  });
  const { data: locationsData, isLoading: isLocationsLoading } = useGetLocationsByRestaurantIdQuery(restaurantId);

  // Trigger check for available tables only when location is selected
  const { data: availableTables, isFetching } = useGetTablesByLocationIdQuery(
    selectedLocationId as number,
    { skip: !selectedLocationId } // Skip the query if no location is selected
  );

  // Find restaurant by ID
  const restaurant = restaurantData?.find((r) => r.id === restaurantId);

  // Handle form submission
  const onFinish = (values: FormValues) => {
    const bookingDetails = {
      name: values.name,
      phoneNumber:values.phone,
      email: values.email,
      locationId: selectedLocationId as number,
      tableId: values.table,
      noPeople: values.persons,
      preferences: values.preferences,
    };

    // Dispatch the booking details to the order slice
    dispatch(setBookingDetails(bookingDetails));

    console.log('Booking details:', bookingDetails);
    message.success('Booking submitted successfully!');
  };

  // Handle location change
  const handleLocationChange = (locationId: number) => {
    setSelectedLocationId(locationId);
    setHasAvailableTable(null); // Reset availability status when selecting a new location
  };

  // Update availability status whenever the check finishes
  useEffect(() => {
    if (availableTables !== undefined) {
      const hasTables = availableTables.length > 0;
      setHasAvailableTable(hasTables);

      if (!hasTables) {
        message.error('No tables available at this location. Please select another location.');
      }
    }
  }, [availableTables]);

  // Redirect to restaurant's menu page
  const goToMenuPage = () => {
    navigate(AppRoutes.IN_RESTAURANT, { state: { restaurantId } });
  };

  if (isRestaurantLoading || isLocationsLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="form-container">
      <div className="restaurant-details">
        {restaurant?.logo && (
          <img
            src={`data:image/png;base64,${restaurant.logo}`}
            alt={restaurant.restaurantName}
            className="r-logo"
          />
        )}
        <h2 className="r-name">{restaurant?.restaurantName || '#Restaurant'}</h2>
      </div>
      <div className="form-content">
        <Form
          form={form}
          name="basic"
          layout="vertical"
          size="large"
          onFinish={onFinish}
          className="custom-label"
        >
          <Form.Item
            label="Nume/Prenume"
            name="name"
            rules={[{ required: true, message: 'Va rog introduce-ti Nume/Prenume' }]}
          >
            <Input placeholder="Introduce Nume/Prenume" />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Telefon"
            rules={[{ required: true, message: 'Va rog introduce-ti un numar de contact!' }]}
          >
            <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="email"
            label="E-Mail"
            rules={[{ type: 'email', required: true, message: 'Va rog introduce-ti un E-mail!' }]}
          >
            <Input placeholder="Introduce E-mail" />
          </Form.Item>

          <Form.Item
            label="Filiala"
            name="location"
            rules={[{ required: true, message: hasAvailableTable === false ? 'No tables available.' : 'Va rog selectati o filiala' }]}
          >
            <Select placeholder="Selectati filiala" onChange={(value) => handleLocationChange(value)}>
              {locationsData?.map((location) => (
                <Select.Option key={location.id} value={location.id}>
                  {location.address}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Mese disponibile"
            name="tables"
            rules={[{ required: true, message: 'Va rog selectati o masa!' }]}
          >
            <Select placeholder="Selectati masa disponibila">
              {availableTables?.map((table) => (
                <Select.Option key={table.id} value={table.id}>
                  {`Masa ${table.id} (${table.capacity} persoane)`}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Numar Persoane"
            name="persons"
            rules={[{ required: true, message: 'Va rog introduce-ti numarul persoanelor!' }]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item name={['text', 'preferinte']} label="Preferinte">
            <Input.TextArea />
          </Form.Item>

          <div className="btn-form">
            <CustomButton disabled={hasAvailableTable === false || isFetching} type="submit">
              Rezervă masa
            </CustomButton>
            <CustomButton onClick={goToMenuPage}>
              Vezi meniul restaurantului
            </CustomButton>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default FormIR;

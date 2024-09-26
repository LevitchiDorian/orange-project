import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Form, Input, InputNumber, Select, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useGetAllRestaurantsQuery, useGetLocationsByRestaurantIdQuery, useGetTablesByLocationIdQuery } from '../../../store/apiSlice';
import { useNavigate, useLocation } from 'react-router-dom';
import { AppRoutes } from '../../../app/Router';
import { setBookingDetails } from '../../../features/order/orderSlice';
import { RootState } from '../../../app/store';
import { useBooking } from '../../../hooks/useBooking'; // Import your custom hook
import { BookingStatus, IBookingDTO } from '../../../entities/BookingDTO';

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
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { restaurantId } = location.state || {};
  const [selectedLocationId, setSelectedLocationId] = useState<number | null>(null);
  const [hasAvailableTable, setHasAvailableTable] = useState<boolean | null>(null);
  const { submitBooking } = useBooking(); // Use custom hook

  const items = useSelector((state: RootState) => state.order.items); // Get cart items from Redux state

  const { data: restaurantData, isLoading: isRestaurantLoading } = useGetAllRestaurantsQuery({
    categoryIds: [],
    restaurantName: '',
  });
  const { data: locationsData, isLoading: isLocationsLoading } = useGetLocationsByRestaurantIdQuery(restaurantId);
  const { data: availableTables, isFetching } = useGetTablesByLocationIdQuery(
    selectedLocationId as number,
    { skip: !selectedLocationId }
  );

  const restaurant = restaurantData?.find((r) => r.id === restaurantId);

  // Handle location change
  const handleLocationChange = (locationId: number) => {
    setSelectedLocationId(locationId);
    setHasAvailableTable(null); // Reset availability status when selecting a new location
  };

  // Handle form submission for booking
  const handleSubmit = (values: FormValues) => {
    const bookingDetails = {
      name: values.name,
      phoneNumber: values.phone,
      email: values.email,
      locationId: selectedLocationId as number,
      tableId: values.table,
      noPeople: values.persons,
      preferences: values.preferences,
    };

    dispatch(setBookingDetails(bookingDetails));

    const booking: IBookingDTO = {
      name: bookingDetails.name,
      phoneNumber: bookingDetails.phoneNumber,
      mail: bookingDetails.email,
      locationId: bookingDetails.locationId,
      tableId: bookingDetails.tableId,
      noPeople: bookingDetails.noPeople,
      preferences: bookingDetails.preferences,
      itemIds: [1],
      status: BookingStatus.IN_PROGRESS,
    };

    submitBooking(booking);
    navigate(AppRoutes.MAIN);
  };

  // Handle viewing the menu after form validation
  const handleViewMenu = async () => {
    try {
      // Manually trigger form validation
      const values = await form.validateFields();
      const bookingDetails = {
        name: values.name,
        phoneNumber: values.phone,
        email: values.email,
        locationId: selectedLocationId as number,
        tableId: values.table,
        noPeople: values.persons,
        preferences: values.preferences,
      };

      dispatch(setBookingDetails(bookingDetails));

      // Navigate to restaurant menu page
      navigate(AppRoutes.IN_RESTAURANT, { state: { restaurantId } });
    } catch (error) {
      // Handle validation errors
      console.error('Validation failed:', error);
    }
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
          onFinish={handleSubmit}
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
            <Select placeholder="Selectati filiala" onChange={handleLocationChange}>
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
            <CustomButton onClick={handleViewMenu}>
              Vezi meniul restaurantului
            </CustomButton>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default FormIR;

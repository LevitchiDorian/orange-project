import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { DatePicker, Form, Input, InputNumber, Select, TimePicker, Alert } from 'antd';
import { useDispatch } from 'react-redux';
import { useGetAllRestaurantsQuery, useGetLocationsByRestaurantIdQuery, useGetTablesByLocationIdQuery, useCheckFreeTableByLocationIdQuery } from '../../../store/apiSlice'; // Import useCheckFreeTableByLocationIdQuery
import { useNavigate, useLocation } from 'react-router-dom';
import { AppRoutes } from '../../../app/Router';
import { setBookingDetails } from '../../../features/order/orderSlice';
import { useBooking } from '../../../hooks/useBooking';
import { BookingStatus, IBookingDTO } from '../../../entities/BookingDTO';

interface FormValues {
  name: string;
  phone: string;
  email: string;
  location: string;
  table: number;
  persons: number;
  preferences?: string;
  date: string;
  time: string;
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
  background-color: #f9cc98;
  color: #181a1b;
  border: 2px solid #f9cc98;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 400;
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: #f6af5e;
    color: #181a1b;
    border-color: #f6af5e;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const FormIR: React.FC = () => {
  const [form] = Form.useForm();  // No need to specify FormInstance type here
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { restaurantId } = location.state || {};
  const [selectedLocationId, setSelectedLocationId] = useState<number | null>(null);
  const [hasAvailableTable, setHasAvailableTable] = useState<boolean | null>(null);
  const { submitBooking } = useBooking(); // Use custom hook

  const { data: restaurantData, isLoading: isRestaurantLoading } = useGetAllRestaurantsQuery({
    categoryIds: [],
    restaurantName: '',
  });
  const { data: locationsData, isLoading: isLocationsLoading } = useGetLocationsByRestaurantIdQuery(restaurantId);
  const { data: availableTables, isFetching } = useGetTablesByLocationIdQuery(
    selectedLocationId as number,
    { skip: !selectedLocationId }
  );

  // Use the checkFreeTableByLocationIdQuery to check table availability
  const { data: freeTableAvailable, isFetching: isCheckingTableAvailability } = useCheckFreeTableByLocationIdQuery(
    selectedLocationId as number,
    { skip: !selectedLocationId }
  );

  useEffect(() => {
    if (freeTableAvailable !== undefined) {
      setHasAvailableTable(freeTableAvailable);
    }
  }, [freeTableAvailable]);

  const restaurant = restaurantData?.find((r) => r.id === restaurantId);

  // Handle location change
  const handleLocationChange = (locationId: number) => {
    setSelectedLocationId(locationId);
    setHasAvailableTable(null);  // Reset availability status when selecting a new location
  };

  // Handle form submission for booking
  const handleSubmit = (values: FormValues) => {
    // Check if date and time are moment objects before calling format
    const bookingDate = values.date && values.time 
      ? `${(values.date as any)?.format('YYYY-MM-DD')} ${(values.time as any)?.format('HH:mm')}`
      : '';

    const bookingDetails = {
      name: values.name,
      phoneNumber: values.phone,
      mail: values.email,
      locationId: selectedLocationId as number,
      tableId: values.table,
      noPeople: values.persons,
      preferences: values.preferences,
      bookingDate,  // Add booking date to bookingDetails
    };

    dispatch(setBookingDetails(bookingDetails));

    const booking: IBookingDTO = {
      ...bookingDetails,
      itemIds: [], // Just booking the table
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
  
      // Combine date and time into a single string (assuming date is in YYYY-MM-DD format)
      const bookingDate = `${values.date.format('YYYY-MM-DD')} ${values.time.format('HH:mm')}`;
  
      // Add bookingDate to bookingDetails object
      const bookingDetails = {
        name: values.name,
        phoneNumber: values.phone,
        mail: values.email,
        locationId: selectedLocationId as number,
        tableId: values.table,
        noPeople: values.persons,
        preferences: values.preferences,
        bookingDate,  // Add the formatted bookingDate
      };
  
      dispatch(setBookingDetails(bookingDetails));
  
      // Navigate to restaurant menu page
      navigate(AppRoutes.IN_RESTAURANT, { state: { restaurantId } });
    } catch (error) {
      // Handle validation errors
      console.error('Validation failed:', error);
    }
  };

  if (isRestaurantLoading || isLocationsLoading || isCheckingTableAvailability) {
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
            rules={[{ required: true, message: 'Vă rog introduceți un Nume/Prenume' }]}
          >
            <Input placeholder="Introduce un Nume/Prenume" />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Telefon"
            rules={[{ required: true, message: 'Vă rog introduceți un număr de contact!' }]}
          >
            <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="email"
            label="E-Mail"
            rules={[{ type: 'email', required: true, message: 'Vă rog introduceți un E-mail!' }]}
          >
            <Input placeholder="Introduce E-mail" />
          </Form.Item>

          <Form.Item 
            name="date"
            label="Data Rezervării"
            rules={[{ required: true, message: 'Vă rog selectați o dată!' }]}
            >
            <DatePicker format="YYYY-MM-DD"/>
          </Form.Item>

          <Form.Item 
            name="time"
            label="Ora Rezervării"
            rules={[{ required: true, message: 'Vă rog selectați o oră!' }]}
            >
            <TimePicker format="HH:mm" />
          </Form.Item>

          <Form.Item
            label="Filială"
            name="location"
            rules={[{ required: true, message: hasAvailableTable === false ? 'Nu sunt mese disponibile.' : 'Vă rog selectați o filială' }]}
          >
            <Select placeholder="Selectați filiala" onChange={handleLocationChange}>
              {locationsData?.map((location) => (
                <Select.Option key={location.id} value={location.id}>
                  {location.address}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          {/* Display an alert if no tables are available */}
          {hasAvailableTable === false && (
            <Alert
              message="Nu sunt mese disponibile"
              description="Vă rugăm să alegeți o altă filială."
              type="warning"
              showIcon
            />
          )}

          <Form.Item
            label="Mese disponibile"
            name="tables"
            rules={[{ required: false, message: 'Vă rog selectați o masă!' }]}
          >
            <Select placeholder="Selectați masa disponibilă" disabled={hasAvailableTable === false}>
              {availableTables?.map((table) => (
                <Select.Option key={table.id} value={table.id}>
                  {`Masa ${table.id}`}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Număr Persoane"
            name="persons"
            rules={[{ required: false, message: 'Vă rog introduceți numărul persoanelor!' }]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item name="preferences" label="Preferințe">
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

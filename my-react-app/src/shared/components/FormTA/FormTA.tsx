import React, { useState } from 'react';
import styled from 'styled-components';
import { DatePicker, Form, Input, Select, TimePicker } from "antd";
import './FormTA.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useGetAllRestaurantsQuery, useGetLocationsByRestaurantIdQuery } from '../../../store/apiSlice';
import { setBookingDetails } from '../../../features/order/orderSlice';
import { RootState } from '../../../app/store';
import { AppRoutes } from '../../../app/Router';
import { IBookingDTO, BookingStatus } from '../../../entities/BookingDTO';
import { useBooking } from '../../../hooks/useBooking'; // Import your custom hook

interface FormValues {
  name: string;
  phone: string;
  email: string;
  location: string;
  preferences?: string;
  date: string;
  time:string;
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
`;

const FormTA: React.FC = () => {
  const [form] = Form.useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { restaurantId } = location.state || {};
  const [selectedLocationId, setSelectedLocationId] = useState<number | null>(null);

  const { submitBooking } = useBooking(); // Use custom hook

  // Fetch all restaurants and locations data
  const { data: restaurantData, isLoading: isRestaurantLoading } = useGetAllRestaurantsQuery({
    categoryIds: [],
    restaurantName: '',
  });
  const restaurant = restaurantData?.find((r) => r.id === restaurantId);
  const { data: locationsData, isLoading: isLocationsLoading } = useGetLocationsByRestaurantIdQuery(restaurantId);

  // Get items from the cart in the Redux store
  const cartItems = useSelector((state: RootState) => state.cart.items);

  // Extract only item IDs from the cart
  const itemIds = cartItems.flatMap(item => Array(item.quantity).fill(item.id));

  const onFinish = (values: FormValues) => {
    // Combine date and time into a single string
    const bookingDate = values.date && values.time 
    ? `${(values.date as any)?.format('YYYY-MM-DD')} ${(values.time as any)?.format('HH:mm')}`
    : '';
  
    const bookingDetails = {
      name: values.name,
      phoneNumber: values.phone,
      mail: values.email,  // email for internal use
      locationId: selectedLocationId as number,
      tableId: null,
      noPeople: 0,
      preferences: values.preferences,
      bookingDate, // Add the booking date to bookingDetails
    };
  
    // Dispatch the booking details to the order slice
    dispatch(setBookingDetails(bookingDetails));
  
    // Create the booking object using bookingDetails and itemIds from cart
    const booking: IBookingDTO = {
      name: bookingDetails.name,
      phoneNumber: bookingDetails.phoneNumber,
      mail: bookingDetails.mail,  // Map email to mail in IBookingDTO
      noPeople: bookingDetails.noPeople,
      preferences: bookingDetails.preferences,
      locationId: bookingDetails.locationId,
      tableId: bookingDetails.tableId, // Ensure this is updated with a valid table ID
      itemIds: itemIds, // Use item IDs from the cart
      status: BookingStatus.IN_PROGRESS, // Set default status
      bookingDate: bookingDetails.bookingDate, // Ensure bookingDate is included
    };
  
    // Pass the booking object to the submitBooking function
    submitBooking(booking);
  
    // Navigate to the main page after submitting
    navigate(AppRoutes.MAIN);
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
          className='custom-label'
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
            name="date"
            label="Data Rezervarii"
            rules={[{ required: true, message: 'Va rog selectati o data!' }]}
            >
            <DatePicker format="YYYY-MM-DD" />
          </Form.Item>

          <Form.Item 
            name="time"
            label="Ora Rezervarii"
            rules={[{ required: true, message: 'Va rog selectati o ora!' }]}
            >
            <TimePicker format="HH:mm" />
          </Form.Item>

          <Form.Item
            label="Filiala"
            name="location"
            rules={[{ required: true, message: 'Va rog selectati o filiala' }]}
          >
            <Select
              placeholder="Selectati filiala"
              onChange={(value) => setSelectedLocationId(value)}
            >
              {locationsData?.map((location) => (
                <Select.Option key={location.id} value={location.id}>
                  {location.address}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name={['text', 'preferinte']} 
            label="Preferinte"
          >
            <Input.TextArea />
          </Form.Item>
          
          <Form.Item className='btn-form'>
            <CustomButton type="submit">
              Finalizează Comanda
            </CustomButton>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default FormTA;

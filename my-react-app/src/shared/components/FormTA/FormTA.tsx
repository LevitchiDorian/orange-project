import React, { useState } from 'react';
import styled from 'styled-components';
import { DatePicker, Form, Input, Select } from "antd";
import './FormTA.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useGetAllRestaurantsQuery, useGetLocationsByRestaurantIdQuery } from '../../../store/apiSlice';
import { setBookingDetails } from '../../../features/order/orderSlice';
import { RootState } from '../../../app/store';
import { AppRoutes } from '../../../app/Router';
import { IBookingDTO, BookingStatus } from '../../../entities/BookingDTO';
import { useBooking } from '../../../hooks/useBooking'; // Import your custom hook
import dayjs, { Dayjs } from 'dayjs'; // Import Dayjs instead of Moment.js

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
`;

const FormTA: React.FC = () => {
  const [form] = Form.useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { restaurantId } = location.state || {};
  const [selectedLocationId, setSelectedLocationId] = useState<number | null>(null);

  const { submitBooking } = useBooking(); // Use custom hook

  // Generate time options in 15-minute intervals between 08:00 AM and 11:00 PM
  const generateTimeOptions = () => {
    const options = [];
    let currentTime = dayjs('08:00', 'HH:mm'); // Use Dayjs here

    while (currentTime <= dayjs('23:00', 'HH:mm')) {
      options.push(currentTime.format('HH:mm'));
      currentTime = currentTime.add(15, 'minute');
    }

    return options;
  };

  // Function to disable past dates using Dayjs
  const disablePastDates = (current: Dayjs) => {
    return current && current.isBefore(dayjs().startOf('day'));
  };

  const timeOptions = generateTimeOptions();

  // Fetch all restaurants and locations data
  const { data: restaurantData, isLoading: isRestaurantLoading } = useGetAllRestaurantsQuery({
    categoryIds: [],
    restaurantName: '',
  });
  const restaurant = restaurantData?.find((r) => r.id === restaurantId);
  const { data: locationsData, isLoading: isLocationsLoading } = useGetLocationsByRestaurantIdQuery(restaurantId);


  const cartItems = useSelector((state: RootState) => state.cart.items);
  const itemIds = cartItems.flatMap(item => Array(item.quantity).fill(item.id));

  const onFinish = (values: FormValues) => {
    // Ensure date is a valid Dayjs object
    const dateValue = dayjs(values.date); 
    const timeValue = dayjs(values.time, 'HH:mm');

    // Combine date and time into one string
    const bookingDate = dateValue && timeValue
    ? `${dateValue.format('YYYY-MM-DD')} ${timeValue.format('HH:mm')}`
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
            rules={[{ required: true, message: 'Vă rog introduceți un Nume/Prenume' }]}
          >
            <Input placeholder="Introduce Nume/Prenume" />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Telefon"
            rules={[
              { required: true, message: 'Vă rog introduceți un număr de contact!' },
              { len: 8, message: 'Numărul de telefon trebuie să aibă exact 8 cifre!', }
            ]}          
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
            <DatePicker format="YYYY-MM-DD" 
              disabledDate={disablePastDates} // Use the disable function with Dayjs
            />
          </Form.Item>

          <Form.Item 
            name="time"
            label="Ora Rezervării"
            rules={[{ required: true, message: 'Vă rog selectați o oră!' }]}
          >
            <Select placeholder="Selectați o oră" style={{width: '150px'}}>
            {timeOptions.map((time) => (
              <Option key={time} value={time}>
                {time}
              </Option>
            ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Filiala"
            name="location"
            rules={[{ required: true, message: 'Vă rog selectați o filială' }]}
          >
            <Select
              placeholder="Selectați filiala"
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
            name={['text', 'preferințe']} 
            label="Preferințe"
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

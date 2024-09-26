import React, { useState } from 'react';
import styled from 'styled-components';
import { Form, Input, Select } from "antd";
import './FormTA.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGetAllRestaurantsQuery, useGetLocationsByRestaurantIdQuery } from '../../../store/apiSlice';
import { useDispatch } from 'react-redux';
import { setBookingDetails } from '../../../features/order/orderSlice';
import { AppRoutes } from '../../../app/Router';

interface FormValues {
  name: string;
  phone: string;
  email: string;
  location: string;
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
  background-color: #FFEFDD; /* Default background color */
  color: #181a1b; /* Default text color */
  border: 2px solid #FFEFDD; /* Match border with background */
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 400;
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s; /* Smooth hover effect */

  &:hover {
    background-color: #f9cc98; /* Hover background color */
    color: #181a1b; /* Hover text color */
    border-color: #f9cc98; /* Match border with hover background */
  }
`;

const FormTA: React.FC = () => {
  const [form] = Form.useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { restaurantId } = location.state || {};
  const [selectedLocationId, setSelectedLocationId] = useState<number | null>(null);

  // Fetch all restaurants and locations data
  const { data: restaurantData, isLoading: isRestaurantLoading } = useGetAllRestaurantsQuery({
    categoryIds: [],
    restaurantName: '',
  });
  const { data: locationsData, isLoading: isLocationsLoading } = useGetLocationsByRestaurantIdQuery(restaurantId);

  // Find restaurant by ID
  const restaurant = restaurantData?.find((r) => r.id === restaurantId);

  // Handle form submission
  const onFinish = (values: FormValues) => {
    const bookingDetails = {
      name: values.name,
      phoneNumber: values.phone,
      email: values.email,
      locationId: selectedLocationId as number,
      tableId: null,
      noPeople: 0,
      preferences: values.preferences,
    };

    // Dispatch the booking details to the order slice
    dispatch(setBookingDetails(bookingDetails));

    console.log('Booking details:', bookingDetails);
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

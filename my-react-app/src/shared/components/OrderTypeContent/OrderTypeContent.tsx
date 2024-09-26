import React from 'react';
import './OrderTypeContent.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { AppRoutes } from '../../../app/Router';
import { useGetAllRestaurantsQuery } from '../../../store/apiSlice';

const OrderTypeContent: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { restaurantId } = location.state;


  const { data: restaurants, isLoading, error } = useGetAllRestaurantsQuery({
    categoryIds: [],
    restaurantName: '',
  });


  const restaurant = restaurants?.find((r) => r.id === restaurantId);

  const handleTakeawayClick = () => {
    navigate(AppRoutes.TAKEAWAY, { state: { restaurantId } });
  };

  const handleInRestaurantClick = () => {
    navigate(AppRoutes.IN_RESTAURANT, { state: { restaurantId } });
  };

  if (isLoading) {
    return <p>Loading restaurant details...</p>;
  }

  if (error || !restaurant) {
    return <p>Error loading restaurant details</p>;
  }

  return (
    <div className='order-content'>
      <div className='order-restaurant'>
        {restaurant.logo && (
          <img 
            src={`data:image/png;base64,${restaurant.logo}`}  
            alt="Restaurant Logo" 
            className='restaurant-logo' 
          />
        )}
        {restaurant.restaurantName && (
          <h2 className="restaurant-title">{restaurant.restaurantName}</h2>
        )}
      </div>
      <div className='order-type'>
        <div onClick={handleTakeawayClick} className='type-take'>
          <h3>La Pachet</h3>
        </div>
        <div onClick={handleInRestaurantClick} className='type-stay'>
          <h3>Pe Loc</h3>
        </div>
      </div>
    </div>
  );
};

export default OrderTypeContent;

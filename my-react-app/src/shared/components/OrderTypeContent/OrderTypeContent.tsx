import React from 'react';
import './OrderTypeContent.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { AppRoutes } from '../../../app/Router';

const OrderTypeContent: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Retrieve restaurantId from the location state
  const { restaurantId } = location.state;

  const handleTakeawayClick = () => {
    // Navigate to the TAKEAWAY page and pass restaurantId in the state
    navigate(AppRoutes.TAKEAWAY, { state: { restaurantId } });
  };

  const handleInRestaurantClick = () => {
    // Navigate to the IN_RESTAURANT page and pass restaurantId in the state
    navigate(AppRoutes.IN_RESTAURANT, { state: { restaurantId } });
  };

  return (
    <div className='order-content'>
      <div className='order-restaurant'>
        <img src="restaurant-logo.png" alt="" className='restaurant-logo' />
        <h2 className="restaurant-name">#Restaurant</h2> {/* Optionally update with restaurant name */}
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

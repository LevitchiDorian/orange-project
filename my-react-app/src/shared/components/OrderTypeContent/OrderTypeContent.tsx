import React from 'react'
import "./OrderTypeContent.css"
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../../app/Router';

const OrderTypeContent: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className='order-content'>
      <div className='order-restaurant'>
        <img src="restaurant-logo.png" alt="" className='restaurant-logo' />
        <h2 className="restaurant-name">#Restaurant</h2>
      </div>
      <div className='order-type'>
        <div onClick={() => navigate(AppRoutes.TAKEAWAY)} className='type-take'>
          <h3>La Pachet</h3>
        </div>
        <div onClick={() => navigate(AppRoutes.IN_RESTAURANT)} className='type-stay'>
          <h3>Pe Loc</h3>
        </div>
      </div>
    </div>
  )
}

export default OrderTypeContent

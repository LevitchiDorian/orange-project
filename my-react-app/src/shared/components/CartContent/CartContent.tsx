import React from 'react';
import "./CartContent.css";

const CartContent: React.FC = () => {
  return (
    <div className='cart-content'>
      <div className='cart-header'>
        <h2 className="cart-title">Coșul Tău</h2>
      </div>
      <div className='cart-items'>
        <p>Aici vor apărea produsele adăugate în coș.</p>
      </div>
    </div>
  );
};

export default CartContent;

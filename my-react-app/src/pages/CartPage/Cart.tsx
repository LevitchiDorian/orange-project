import React from 'react';
import Footer from '../../shared/components/Footer/Footer';
import Navbar from '../../shared/components/Navbar/Navbar';
import CartContent from '../../shared/components/CartContent/CartContent';


const Cart: React.FC = () => {
  return (
    <div className="app">
      <div className="background-blur"></div>
      <Navbar />
      <CartContent />
      <Footer />
    </div>
  );
}

export default Cart;
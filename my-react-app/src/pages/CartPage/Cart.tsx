import React from 'react';
import Footer from '../../shared/components/Footer/Footer';
import Navbar from '../../shared/components/Navbar/Navbar';


const Cart: React.FC = () => {
  return (
    <div className="app">
      <div className="background-blur"></div>
      <Navbar />
      <Footer />
    </div>
  );
}

export default Cart;
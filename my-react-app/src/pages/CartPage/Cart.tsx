import React from 'react';
import Footer from '../../shared/components/Footer/Footer';
import Navbar from '../../shared/components/Navbar/Navbar';
import CartContent from '../../shared/components/CartContent/CartContent';
import Spinner from '../../shared/components/Spinner/Spinner';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';


const Cart: React.FC = () => {
// Access the loading state for this page
const isLoading = useSelector((state: RootState) => state.spinner);

  return (
    <div className="app">
      {isLoading && <Spinner />} {/* Show Spinner when loading */}
      <div className="background-blur"></div>
      <Navbar />
      <CartContent />
      <Footer />
    </div>
  );
}

export default Cart;
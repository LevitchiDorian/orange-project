import React from 'react';
import Footer from '../../../shared/components/Footer/Footer';
import Navbar from '../../../shared/components/Navbar/Navbar';
import RestaurantMenu from '../../../shared/components/RestaurantMenu/RestaurantMenu';
import { useLocation } from 'react-router-dom';

const MainPage: React.FC = () => {
  const location = useLocation();
  const { restaurantId } = location.state || { restaurantId: 1 }; 

  return (
    <div className="app">
      <div className="background-blur"></div>
      <Navbar />
      <RestaurantMenu restaurantId={restaurantId} />
      <Footer />
    </div>
  );
}

export default MainPage;

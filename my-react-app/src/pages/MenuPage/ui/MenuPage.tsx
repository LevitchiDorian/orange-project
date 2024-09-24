import React from 'react';
import Footer from '../../../shared/components/Footer/Footer';
import Navbar from '../../../shared/components/Navbar/Navbar';
import RestaurantMenu from '../../../shared/components/RestaurantMenu/RestaurantMenu';


const MainPage: React.FC = () => {
  return (
    <div className="app">
      <div className="background-blur"></div>
      <Navbar />
      <RestaurantMenu />
      <Footer />
    </div>
  );
}

export default MainPage;

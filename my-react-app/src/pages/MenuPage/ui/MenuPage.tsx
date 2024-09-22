import React from 'react';
import Header from '../../../shared/components/Header/Header';
import Footer from '../../../shared/components/Footer/Footer';
import Navbar from '../../../shared/components/Navbar/Navbar';
import RestaurantMenu from '../../../shared/components/RestaurantMenu/RestaurantMenu';


const MainPage: React.FC = () => {
  return (
    <div className="app">
      <div className="background-blur"></div>
      <Navbar />
      <Header />
      <RestaurantMenu />
      <Footer />
    </div>
  );
}

export default MainPage;

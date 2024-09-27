import React from 'react';
import Footer from '../../../shared/components/Footer/Footer';
import Navbar from '../../../shared/components/Navbar/Navbar';
import RestaurantMenu from '../../../shared/components/RestaurantMenu/RestaurantMenu';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import Spinner from '../../../shared/components/Spinner/Spinner';

const MainPage: React.FC = () => {
  const location = useLocation();
  const { restaurantId } = location.state || { restaurantId: 1 }; 
  const isLoading = useSelector((state: RootState) => state.spinner);

  return (
    <div className="app">
      {isLoading && <Spinner />} {/* Show Spinner when loading */}
      <div className="background-blur"></div>
      <Navbar />
      <RestaurantMenu restaurantId={restaurantId} />
      <Footer />
    </div>
  );
}

export default MainPage;

import React, { useState, useEffect } from 'react';
import { AboutUs } from '../AboutUs/AboutUs';
import './MainContent.css';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../../app/Router';
import { useGetAllRestaurantsQuery } from '../../../store/apiSlice'; // Import API hook

const MainContent: React.FC = () => {
  const navigate = useNavigate();
  const { data: restaurants = [], isLoading, error } = useGetAllRestaurantsQuery({
    categoryIds: [], // If you want all restaurants, leave this empty
    restaurantName: '',
  });
  
  const [randomRestaurants, setRandomRestaurants] = useState<any[]>([]);
  const visibleCards = 3;

  // Function to shuffle the restaurants array
  const shuffleArray = (array: any[]) => {
    return array.sort(() => Math.random() - 0.5);
  };

  // Function to handle random selection of restaurants
  useEffect(() => {
    if (restaurants.length > 0) {
      const shuffledRestaurants = shuffleArray([...restaurants]);
      setRandomRestaurants(shuffledRestaurants.slice(0, visibleCards));
    }
  }, [restaurants]);

  const handleNext = () => {
    setRandomRestaurants(() => {
      const shuffledRestaurants = shuffleArray([...restaurants]);
      return shuffledRestaurants.slice(0, visibleCards);
    });
  };

  if (isLoading) return <p>Loading recommendations...</p>;
  if (error) return <p>Error loading recommendations</p>;

  

  return (
    <main className="main-content">
      <section className="recommendations">
        <h2 className='recommendations-title'>Recomandăm</h2>
        <div className="restaurant-slider">
          <button className="slider-arrow left" onClick={handleNext}>
            <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="white" strokeWidth="2">
              <path d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="restaurant-card-container">
            {randomRestaurants.map((restaurant, index) => (
              <div key={index} className="restaurant-wrapper">
                <div onClick={() => navigate(AppRoutes.ORDER_TYPE, { state: { restaurantId: restaurant.id } })} className="restaurant-card">
                <img
                    src={`data:image/png;base64,${restaurant.logo}`} 
                    alt={restaurant.restaurantName}
                    className="restaurant-image"
                  />
                </div>
                <span className="restaurant-name">{restaurant.restaurantName}</span>
              </div>
            ))}
          </div>
          <button className="slider-arrow right" onClick={handleNext}>
            <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="white" strokeWidth="2">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </section>

      {/* Add the AboutUs component */}
      <AboutUs />
    </main>
  );
};

export default MainContent;

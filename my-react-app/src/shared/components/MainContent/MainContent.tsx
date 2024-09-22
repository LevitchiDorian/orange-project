import React, { useState } from 'react';
import { AboutUs } from '../AboutUs/AboutUs'; 
import AndysImage from './RecommendationsImg/Andys.png';
import LaPlacinteImage from './RecommendationsImg/Laplacinte.jpg';
import McImage from './RecommendationsImg/Mc.png';
import MrKebabImage from './RecommendationsImg/Mrkebab.png';
import TwisterImage from './RecommendationsImg/Twister.png';
import './MainContent.css';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../../app/Router';

const MainContent: React.FC = () => {
  const navigate = useNavigate();
  const restaurants = [
    { name: "McDonald's", image: McImage },
    { name: "Andy's", image: AndysImage },
    { name: 'Mr Kebab', image: MrKebabImage },
    { name: 'Twister', image: TwisterImage },
    { name: 'La Placinte', image: LaPlacinteImage },
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleCards = 3;

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % restaurants.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + restaurants.length) % restaurants.length);
  };

  const getVisibleRestaurants = () => {
    const visibleRestaurants = [];
    for (let i = 0; i < visibleCards; i++) {
      visibleRestaurants.push(restaurants[(currentIndex + i) % restaurants.length]);
    }
    return visibleRestaurants;
  };

  return (
    <main className="main-content">
      <section className="recommendations">
        <h2>Recomandăm</h2>
        <div className="restaurant-slider">
          <button className="slider-arrow left" onClick={handlePrev}>
            {/* SVG pentru săgeata stânga */}
            <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="white" strokeWidth="2">
              <path d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="restaurant-card-container">
            {getVisibleRestaurants().map((restaurant, index) => (
              <div key={index} className="restaurant-wrapper">
                <div onClick={() => navigate(AppRoutes.ORDER_TYPE)} className="restaurant-card">
                  <img src={restaurant.image} alt={restaurant.name} className="restaurant-image" />
                </div>
                <span className="restaurant-name">{restaurant.name}</span>
              </div>
            ))}
          </div>
          <button className="slider-arrow right" onClick={handleNext}>
            {/* SVG pentru săgeata dreapta */}
            <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="white" strokeWidth="2">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </section>

      {/* Adaugă componenta AboutUs */}
      <AboutUs />
    </main>
  );
};

export default MainContent;

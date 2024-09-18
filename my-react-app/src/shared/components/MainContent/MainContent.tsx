import React from 'react';
import { AboutUs } from '../AboutUs/AboutUs'; // Importă componenta AboutUs
import './MainContent.module.css';
const MainContent: React.FC = () => {
  return (
    <main className="main-content">
      <section className="recommendations">
        <h2>Recomandam</h2>
        <div className="restaurant-slider">
          <button className="slider-arrow left">&lt;</button>
          <div className="restaurant-card">McDonald's</div>
          <div className="restaurant-card">Andy's</div>
          <div className="restaurant-card">Mr Kebab</div>
          <button className="slider-arrow right">&gt;</button>
        </div>
      </section>

      {/* Adaugă componenta AboutUs */}
      <AboutUs />
    </main>
  );
}

export default MainContent;

import React from 'react';
import traditionalImg from './categoryImages/traditional.jpg';
import asiaticImg from './categoryImages/asiatic.png';
import burgerImg from './categoryImages/burger.jpg';
import kebabImg from './categoryImages/kebab.jpg';
import pizzaImg from './categoryImages/pizza.jpg';
import { useNavigate } from 'react-router-dom';  
import { AppRoutes } from '../../../app/Router';
import './Header.css';

const Header: React.FC = () => {
  const navigate = useNavigate();  // Initialize the navigate hook

  return (
    <header className="header">
      <h1>Descoperă Restaurantele din Chișinău</h1>
      <h3>Alege categoria dorită:</h3>
      <div className="categories">
        <div className="category">
          <button className="category-button" onClick={() => navigate(AppRoutes.CATEGORY_PAGE)}>
            <img src={traditionalImg} alt="Tradițional" className="category-image" />
          </button>
          <span className="category-name">Tradițional</span>
        </div>
        <div className="category">
          <button className="category-button" onClick={() => navigate(AppRoutes.CATEGORY_PAGE)}>
            <img src={asiaticImg} alt="Asiatic" className="category-image" />
          </button>
          <span className="category-name">Asiatic</span>
        </div>
        <div className="category">
          <button className="category-button" onClick={() => navigate(AppRoutes.CATEGORY_PAGE)}>
            <img src={burgerImg} alt="Burger" className="category-image" />
          </button>
          <span className="category-name">Burger</span>
        </div>
        <div className="category">
          <button className="category-button" onClick={() => navigate(AppRoutes.CATEGORY_PAGE)}>
            <img src={kebabImg} alt="Kebab" className="category-image" />
          </button>
          <span className="category-name">Kebab</span>
        </div>
        <div className="category">
          <button className="category-button" onClick={() => navigate(AppRoutes.CATEGORY_PAGE)}>
            <img src={pizzaImg} alt="Pizza" className="category-image" />
          </button>
          <span className="category-name">Pizza</span>
        </div>
      </div>
    </header>
  );
}

export default Header;

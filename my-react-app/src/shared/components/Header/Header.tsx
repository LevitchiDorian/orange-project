import React from 'react';
import traditionalImg from './categoryImages/traditional.jpg';
import asiaticImg from './categoryImages/asiatic.png';
import burgerImg from './categoryImages/burger.jpg';
import kebabImg from './categoryImages/kebab.jpg';
import cafeaImg from './categoryImages/cafea.jpg';
import './Header.module.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="logo">Logo</div>
      <h1>Descoperă Restaurantele din Chișinău</h1>
      <div className="categories">
        <div className="category">
          <button className="category-button">
            <img src={traditionalImg} alt="Tradițional" className="category-image" />
          </button>
          <span className="category-name">Tradițional</span>
        </div>
        <div className="category">
          <button className="category-button">
            <img src={asiaticImg} alt="Asiatic" className="category-image" />
          </button>
          <span className="category-name">Asiatic</span>
        </div>
        <div className="category">
          <button className="category-button">
            <img src={burgerImg} alt="Burger" className="category-image" />
          </button>
          <span className="category-name">Burger</span>
        </div>
        <div className="category">
          <button className="category-button">
            <img src={kebabImg} alt="Kebab" className="category-image" />
          </button>
          <span className="category-name">Kebab</span>
        </div>
        <div className="category">
          <button className="category-button">
            <img src={cafeaImg} alt="Cafea" className="category-image" />
          </button>
          <span className="category-name">Cafea</span>
        </div>
      </div>
    </header>
  );
}

export default Header;

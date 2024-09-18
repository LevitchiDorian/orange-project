import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="logo">Logo</div>
      <h1>Descoperă Restaurantele Chișinăului</h1>
      <div className="categories">
        <button className="category-button">Traditional</button>
        <button className="category-button">Asiatic</button>
        <button className="category-button">Burger</button>
        <button className="category-button">Kebab</button>
        <button className="category-button">Cafea</button>
      </div>
    </header>
  );
}

export default Header;
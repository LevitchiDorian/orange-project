import React from 'react';
import './CategoryContent.css';

const CategoryContent: React.FC = () => {
  return (
    <div className='category-page'>
      <h2 className='category-title'>Alege restaurantul</h2>
      <div className='restaurant-list'>
        <div className='category-card'>
          <div className='restaurant-logo'></div>
          <h3 className='restaurant-name'>Restaurant Name</h3>
        </div>
        <div className='category-card'>
          <div className='restaurant-logo'></div>
          <h3 className='restaurant-name'>Restaurant Name</h3>
        </div>
      </div>
    </div>
  );
};

export default CategoryContent;

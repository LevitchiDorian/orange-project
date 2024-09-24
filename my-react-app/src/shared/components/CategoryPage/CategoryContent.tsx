import React from 'react';
import './CategoryPage.css';

const CategoryPage: React.FC = () => {
  return (
    <div className='category-page'>
      <h2 className='category-title'>Selected Category</h2>
      <div className='restaurant-list'>
        <div className='restaurant-card'>
          <div className='restaurant-image-placeholder'></div>
          <h3 className='restaurant-name-placeholder'>Restaurant Name</h3>
        </div>
        <div className='restaurant-card'>
          <div className='restaurant-image-placeholder'></div>
          <h3 className='restaurant-name-placeholder'>Restaurant Name</h3>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;

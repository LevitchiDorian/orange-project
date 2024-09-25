import React, { useEffect, useState } from 'react';
import traditionalImg from './categoryImages/traditional.jpg';
import asiaticImg from './categoryImages/asiatic.png';
import burgerImg from './categoryImages/burger.jpg';
import kebabImg from './categoryImages/kebab.jpg';
import pizzaImg from './categoryImages/pizza.jpg';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../../app/Router';
import { useGetAllCategoriesQuery } from '../../../store/apiSlice';
import './Header.css';

const categoryImages: Record<string, string> = {
  Traditional: traditionalImg,
  Asian: asiaticImg,
  Burger: burgerImg,
  Kebab: kebabImg,
  Pizza: pizzaImg,
};

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { data: categories = [], isLoading, error } = useGetAllCategoriesQuery();
  const [mappedCategories, setMappedCategories] = useState<any[]>([]);

  useEffect(() => {
    if (!isLoading && !error) {
      const mapped = categories.map((category: any) => {
        const image = categoryImages[category.categoryName as keyof typeof categoryImages] || pizzaImg;
        return { ...category, image };
      });
      setMappedCategories(mapped);
    }
  }, [categories, isLoading, error]);

  if (isLoading) return <p>Loading categories...</p>;
  if (error) return <p>Error loading categories</p>;

  const handleCategoryClick = (categoryId: number, categoryName: string) => {
    // Navigate to category page and pass both categoryId and categoryName in the state
    navigate(AppRoutes.CATEGORY_PAGE, { state: { categoryId, categoryName } });
  };

  return (
    <header className="header">
      <h1>Descoperă Restaurantele din Chișinău</h1>
      <h3>Alege categoria dorită:</h3>
      <div className="categories">
        {mappedCategories.map((category) => (
          <div className="category" key={category.id}>
            <button
              className="category-button"
              onClick={() => handleCategoryClick(category.id, category.categoryName)} // Pass categoryId and categoryName on click
            >
              <img src={category.image} alt={category.categoryName} className="category-image" />
            </button>
            <span className="category-name">{category.categoryName}</span>
          </div>
        ))}
      </div>
    </header>
  );
};

export default Header;

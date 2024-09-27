import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useGetAllRestaurantsQuery } from '../../../store/apiSlice'; // This comes from your apiSlice
import './Categorycontent.css';
import { AppRoutes } from '../../../app/Router';

const CategoryPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { categoryId, categoryName } = location.state as { categoryId: number, categoryName: string };

  // Use RTK Query to get the list of restaurants based on categoryId
  const { data: restaurants = [], isLoading, error } = useGetAllRestaurantsQuery({
    categoryIds: [categoryId],
    restaurantName: '', // or pass a name if needed
  });

  if (isLoading) return <p>Loading restaurants...</p>;
  if (error) return <p>Error loading restaurants</p>;

  const handleRestaurantClick = (restaurantId: number) => {
    navigate(AppRoutes.ORDER_TYPE, { state: { restaurantId } });
  };

  return (
    <div className="category-page">
      <h2 className="category-title">{categoryName}</h2>
      <div className="restaurant-list">
        {restaurants?.map((restaurant) => (
          <div 
            key={restaurant.id} 
            className="restaurant-card"
            onClick={() => handleRestaurantClick(restaurant.id)}
          >
            <div className="restaurant-image-placeholder">
              {restaurant.logo && restaurant.logo.length > 0 ? (
                <img 
                src={`data:image/png;base64,${restaurant.logo}`} 
                  alt={restaurant.restaurantName} 
                  className="restaurant-image"
                />
              ) : (
                <div>No Image Available</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;

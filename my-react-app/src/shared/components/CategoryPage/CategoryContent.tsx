import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useGetAllRestaurantsQuery } from '../../../store/apiSlice'; 
import { IRestaurantDTO } from '../../../entities/RestaurantDTO'; // Import the correct type
import './Categorycontent.css';

const CategoryPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { categoryId } = location.state as { categoryId: number };

  // Fetch restaurants from API
  const { data: restaurants = [], isLoading, error } = useGetAllRestaurantsQuery({
    categoryIds: [categoryId],
    restaurantName: '',
  });

  if (isLoading) return <p>Loading restaurants...</p>;
  if (error) return <p>Error loading restaurants</p>;

  // Navigate to order-type page with the restaurantId
  const handleRestaurantClick = (restaurantId: number) => {
    navigate('/order-type', { state: { restaurantId } });
  };

  return (
    <div className="category-page">
      <h2 className="category-title">Selected Category</h2>
      <div className="restaurant-list">
        {restaurants?.map((restaurant: IRestaurantDTO) => (
          <div 
            key={restaurant.id} 
            className="restaurant-card"
            onClick={() => handleRestaurantClick(restaurant.id)}
          >
            <div className="restaurant-image-placeholder">
              {restaurant.logo && restaurant.logo.length > 0 ? (
                <img src={restaurant.logo[0]} alt={restaurant.restaurantName} />
              ) : (
                <div>No Image Available</div>
              )}
            </div>
            <h3 className="restaurant-name-placeholder">{restaurant.restaurantName}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;

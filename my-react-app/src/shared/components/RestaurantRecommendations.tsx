import React from 'react';
import { Restaurant } from '../../Entities/restaurant';


interface Props {
  recommendations: Restaurant[];
}

export const RestaurantRecommendations: React.FC<Props> = ({ recommendations }) => (
  <div className="recommendations">
    {recommendations.map((restaurant) => (
      <div key={restaurant.id} className="restaurant-item">
        <img src={restaurant.image} alt={restaurant.name} />
        <p>{restaurant.name}</p>
      </div>
    ))}
  </div>
);

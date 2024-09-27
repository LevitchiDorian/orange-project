import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { notification, Button } from 'antd';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import MenuItem from '../MenuItem/MenuItem';
import Pagination from '../Pagination/Pagination';
import styles from './RestaurantMenu.module.css';
import { addToCart, clearCart } from '../../../features/cart/cartSlice'; // Import clearCart
import { useGetAllRestaurantsQuery, useGetMenuByRestaurantIdQuery } from '../../../store/apiSlice';
import { IItemDTO } from '../../../entities/ItemDTO';
import { RootState } from '../../../app/store';
import { AppRoutes } from '../../../app/Router'; // Import your app routes

interface RestaurantMenuProps {
  restaurantId: number;
}

const RestaurantMenu: React.FC<RestaurantMenuProps> = ({ restaurantId }) => {
  const { data: menuData, isLoading, error } = useGetMenuByRestaurantIdQuery(restaurantId);
  const { data: allRestaurants, isLoading: loadingRestaurant, error: restaurantError } = useGetAllRestaurantsQuery({ categoryIds: [], restaurantName: '' });

  const [currentPage, setCurrentPage] = useState(1);
  const [currentItems, setCurrentItems] = useState<IItemDTO[]>([]);

  const itemsPerPage = 6;
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize the navigation hook

  // Access current restaurant in cart and order state
  const currentRestaurantId = useSelector((state: RootState) => state.cart.currentRestaurantId);
  const bookingDetails = useSelector((state: RootState) => state.order.bookingDetails);
  const orderRestaurantId = useSelector((state: RootState) => state.order.currentRestaurantId);
  console.log('Order Restaurant Id: ', orderRestaurantId);

  useEffect(() => {
    if (menuData && menuData.items) {
      const indexOfLastItem = currentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      setCurrentItems(menuData.items.slice(indexOfFirstItem, indexOfLastItem));
    }
  }, [menuData, currentPage]);

  const addToCartHandler = (menuItem: IItemDTO, quantity: number) => {
    if (!bookingDetails) {
      // Takeaway case: Only one restaurant can be added
      if (currentRestaurantId === null || currentRestaurantId === restaurantId) {
        dispatch(addToCart({ item: { ...menuItem, quantity, restaurantId }, restaurantId }));
        
        // Notification for item added to cart with custom duration
        notification.success({
          message: 'Item Added to Cart',
          description: 'Your item was added to the cart.',
          duration: 1, // Notification will disappear after 1 second
          placement: 'top',
        });
      } else {
        // Conflict notification with a button to clear the cart
        notification.warning({
          message: 'Multiple Restaurant Conflict',
          description: 'You can only add items from one restaurant at a time.',
          placement: 'top',
          duration: 2,
          btn: (
            <Button
              type="primary"
              onClick={() => {
                dispatch(clearCart());
              }}
            >
              Clear Cart
            </Button>
          ),
        });
      }
    } else if (bookingDetails) {
      // In-Restaurant case: Only items from the restaurant with `currentRestaurantId` can be added
      if (orderRestaurantId === restaurantId) {
        dispatch(addToCart({ item: { ...menuItem, quantity, restaurantId }, restaurantId }));

        // Notification for item added to cart with custom duration
        notification.success({
          message: 'Item Added to Cart',
          description: 'Your item was added to the cart.',
          duration: 2, // Notification will disappear after 2 seconds
          placement: 'top',
        });
      } else {
        // Conflict notification for in-restaurant case
        notification.warning({
          message: 'Multiple Restaurant Conflict',
          description: 'You can only order from the restaurant you are currently ordering from.',
          duration: 3,
          placement: 'top',
          btn: (
            <Button
              type="primary"
              onClick={() => {
                if (orderRestaurantId) {
                  navigate(AppRoutes.IN_RESTAURANT, { state: { restaurantId: orderRestaurantId } }); // Pass the correct restaurant ID in state
                } else {
                  console.error('orderRestaurantId is undefined.');
                  notification.error({
                    message: 'Error',
                    description: 'Unable to navigate, restaurant ID is undefined.',
                    placement: 'top',
                  });
                }
              }}
            >
              Go to Restaurant
            </Button>
          ),
        });
      }
    }
  };

  const restaurant = allRestaurants?.find((rest) => rest.id === restaurantId);

  if (isLoading || loadingRestaurant) {
    return <p>Loading menu...</p>;
  }

  if (error || restaurantError) {
    return <p>Error loading menu</p>;
  }

  return (
    <div className={styles.container}>
      <div className='order-restaurant'>
        {restaurant && (
          <div className='order-restaurant'>
            {restaurant.logo && (
              <img 
                src={`data:image/png;base64,${restaurant.logo}`}  
                alt="Restaurant Logo" 
                className='restaurant-logo' 
              />
            )}
            {restaurant.restaurantName && (
              <h2 className="restaurant-title">{restaurant.restaurantName}</h2>
            )}
          </div>
        )}
      </div>
      <div className={styles.grid}>
        {currentItems.map((item) => (
          <MenuItem
            key={item.id}
            menuItem={item}
            onAddToCart={addToCartHandler}
          />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil((menuData?.items?.length || 0) / itemsPerPage)}
        onPageChange={setCurrentPage}
        onPreviousPage={() => setCurrentPage(currentPage - 1)}
        onNextPage={() => setCurrentPage(currentPage + 1)}
      />
    </div>
  );
};

export default RestaurantMenu;

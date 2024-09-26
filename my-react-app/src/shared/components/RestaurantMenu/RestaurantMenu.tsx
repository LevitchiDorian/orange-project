import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MenuItem from '../MenuItem/MenuItem';
import Pagination from '../Pagination/Pagination';
import NotificationModal from '../CartNotificationModal/NotificationModal';
import styles from './RestaurantMenu.module.css';
import { addToCart } from '../../../features/cart/cartSlice';
import { useGetAllRestaurantsQuery, useGetMenuByRestaurantIdQuery } from '../../../store/apiSlice';
import { IItemDTO } from '../../../entities/ItemDTO';
import { RootState } from '../../../app/store';

interface RestaurantMenuProps {
  restaurantId: number;
}

const RestaurantMenu: React.FC<RestaurantMenuProps> = ({ restaurantId }) => {
  const { data: menuData, isLoading, error } = useGetMenuByRestaurantIdQuery(restaurantId);
  const { data: allRestaurants, isLoading: loadingRestaurant, error: restaurantError } = useGetAllRestaurantsQuery({ categoryIds: [], restaurantName: '' });

  const [currentPage, setCurrentPage] = useState(1);
  const [currentItems, setCurrentItems] = useState<IItemDTO[]>([]);
  const [showNotification, setShowNotification] = useState(false); 
  const [showConfirmation, setShowConfirmation] = useState(false);

  const [confirmationMessage, setConfirmationMessage] = useState(''); 
  const [notificationMessage, setNotificationMessage] = useState('');

  const itemsPerPage = 6;
  const dispatch = useDispatch();

  // Access current restaurant in cart
  const currentRestaurantId = useSelector((state: RootState) => state.cart.currentRestaurantId);

  useEffect(() => {
    if (menuData && menuData.items) {
      const indexOfLastItem = currentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      setCurrentItems(menuData.items.slice(indexOfFirstItem, indexOfLastItem));
    }
  }, [menuData, currentPage]);

  const addToCartHandler = (menuItem: IItemDTO, quantity: number) => {
    if (currentRestaurantId === null || currentRestaurantId === restaurantId) {
      // If cart is empty or the restaurant matches, add to cart
      dispatch(addToCart({ item: { ...menuItem, quantity, restaurantId }, restaurantId }));
      setConfirmationMessage('Your item was added');
      setShowConfirmation(true);
    } else {
      // Show notification if adding items from a different restaurant
      setNotificationMessage('You can only add items from one restaurant at a time. Please clear your cart first.');
      setShowNotification(true);

      // Auto-hide the notification after 3 seconds
      setTimeout(() => {
        setShowNotification(false);
      }, 3000);
    }
  };

  const closeNotification = () => {
    setShowNotification(false);
    setShowConfirmation(false);
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

      <NotificationModal show={showNotification} onClose={closeNotification} message={notificationMessage} />
      <NotificationModal show={showConfirmation} onClose={closeNotification} message={confirmationMessage} />

    </div>
  );
};

export default RestaurantMenu;

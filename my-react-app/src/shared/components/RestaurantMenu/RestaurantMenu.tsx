import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import MenuItem from '../MenuItem/MenuItem';
import Pagination from '../Pagination/Pagination';
import styles from './RestaurantMenu.module.css';
import { addToCart } from '../../../features/cart/cartSlice';
import { useGetMenuByRestaurantIdQuery } from '../../../store/apiSlice';
import { IItemDTO } from '../../../entities/ItemDTO';

interface RestaurantMenuProps {
  restaurantId: number;
}

const RestaurantMenu: React.FC<RestaurantMenuProps> = ({ restaurantId }) => {
  const { data: menuData, isLoading, error } = useGetMenuByRestaurantIdQuery(restaurantId);

  const [currentPage, setCurrentPage] = useState(1);
  const [currentItems, setCurrentItems] = useState<IItemDTO[]>([]);
  const itemsPerPage = 6;
  const dispatch = useDispatch();

  useEffect(() => {
    if (menuData && menuData.items) {
      const indexOfLastItem = currentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      setCurrentItems(menuData.items.slice(indexOfFirstItem, indexOfLastItem));
    }
  }, [menuData, currentPage]);

  const addToCartHandler = (menuItem: IItemDTO, quantity: number) => {
    // Console log to track which item is being added and the quantity
    console.log(`Adding to cart: ${menuItem.dishName} (ID: ${menuItem.id}) - Quantity: ${quantity}`);

    dispatch(addToCart({ ...menuItem, quantity }));
  };

  if (isLoading) {
    return <p>Loading menu...</p>;
  }

  if (error) {
    return <p>Error loading menu</p>;
  }

  return (
    <div className={styles.container}>
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

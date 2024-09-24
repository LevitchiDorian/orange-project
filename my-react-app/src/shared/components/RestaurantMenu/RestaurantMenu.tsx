import { useState, useEffect } from 'react';
import { useDispatch} from 'react-redux';
import MenuItem from '../MenuItem/MenuItem';
import Pagination from '../Pagination/Pagination';
import styles from './RestaurantMenu.module.css';
import { addToCart } from '../../../features/cart/cartSlice';


interface MenuItemType {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}


const RestaurantMenu = () => {
  const menuItems: MenuItemType[] = [
    { id: '1', name: 'Pepperoni', description: 'Pepperoni, cheese, and tomato sauce', price: 145, image: 'https://via.placeholder.com/150' },
    { id: '2', name: 'Margherita', description: 'Tomato, mozzarella, and basil', price: 135, image: 'https://via.placeholder.com/150' },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [currentItems, setCurrentItems] = useState<MenuItemType[]>([]);
  
  const itemsPerPage = 6;
  const totalPages = Math.ceil(menuItems.length / itemsPerPage);

  const dispatch = useDispatch();

  useEffect(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    setCurrentItems(menuItems.slice(indexOfFirstItem, indexOfLastItem));
  }, [currentPage]);

  const addToCartHandler = (menuItem: MenuItemType, quantity: number) => {
    dispatch(addToCart({ ...menuItem, quantity }));
  };

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
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        onPreviousPage={() => setCurrentPage(currentPage - 1)}
        onNextPage={() => setCurrentPage(currentPage + 1)}
      />
    </div>
  );
};

export default RestaurantMenu;

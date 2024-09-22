import { useState, useEffect } from 'react';
import MenuItem from '../MenuItem/MenuItem';
import Pagination from '../Pagination/Pagination'; 
import styles from './RestaurantMenu.module.css';

interface MenuItemType {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
}

interface CartItem extends MenuItemType {
  quantity: number;
}

const RestaurantMenu = () => {
  const menuItems: MenuItemType[] = [
    { id: 1, name: 'Pepperoni', description: 'Pepperoni, cheese, and tomato sauce', price: '145.00 MDL', image: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Margherita', description: 'Tomato, mozzarella, and basil', price: '135.00 MDL', image: 'https://via.placeholder.com/150' },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [currentItems, setCurrentItems] = useState<MenuItemType[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]); 
  const [isCartLoaded, setIsCartLoaded] = useState(false); 

  const itemsPerPage = 1;
  const totalPages = Math.ceil(menuItems.length / itemsPerPage);

  useEffect(() => {
    if (!isCartLoaded) { 
      const storedCart = localStorage.getItem('cart');
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
      setIsCartLoaded(true); 
    }
  }, [isCartLoaded]);

  useEffect(() => {
    if (isCartLoaded) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart, isCartLoaded]);

  useEffect(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    setCurrentItems(menuItems.slice(indexOfFirstItem, indexOfLastItem));
  }, [currentPage]);

  const addToCart = (menuItem: MenuItemType, quantity: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === menuItem.id);
      let updatedCart;
      if (existingItem) {
        updatedCart = prevCart.map((item) =>
          item.id === menuItem.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        updatedCart = [...prevCart, { ...menuItem, quantity }];
      }
      return updatedCart;
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {currentItems.map((item) => (
          <MenuItem
            key={item.id}
            menuItem={item}
            onAddToCart={addToCart}
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
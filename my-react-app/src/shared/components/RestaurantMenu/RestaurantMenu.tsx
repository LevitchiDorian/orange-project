import { useState, useEffect } from 'react';
import MenuItem from '../MenuItem/MenuItem';
import Pagination from '../Pagination/Pagination'; // Import the Pagination component
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
  const [cart, setCart] = useState<CartItem[]>([]); // Cart state to hold added items
  const [isCartLoaded, setIsCartLoaded] = useState(false); // Track if cart is loaded from localStorage

  const itemsPerPage = 1;
  const totalPages = Math.ceil(menuItems.length / itemsPerPage);

  // Load cart from localStorage on initial load
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      console.log("Loading cart from localStorage:", storedCart);
      setCart(JSON.parse(storedCart));
    } else {
      console.log("No cart found in localStorage.");
    }
    setIsCartLoaded(true); // Mark the cart as loaded
  }, []);

  // Save cart to localStorage whenever the cart state changes, but only after it has been loaded
  useEffect(() => {
    if (isCartLoaded) {
      console.log("Saving cart to localStorage:", cart);
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart, isCartLoaded]);

  useEffect(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    setCurrentItems(menuItems.slice(indexOfFirstItem, indexOfLastItem));
  }, [currentPage]);

  // Function to handle adding items to the cart
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

      console.log("Updated Cart: ", updatedCart);

      return updatedCart; // Return the updated cart
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {currentItems.map((item) => (
          <MenuItem
            key={item.id}
            menuItem={item} // Pass the entire menuItem object
            onAddToCart={addToCart} // Pass the addToCart function
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
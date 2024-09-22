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

const RestaurantMenu = () => {
  const menuItems: MenuItemType[] = [
    { id: 1, name: 'Pepperoni', description: 'Pepperoni, cheese, and tomato sauce', price: '145.00 MDL', image: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Margherita', description: 'Tomato, mozzarella, and basil', price: '135.00 MDL', image: 'https://via.placeholder.com/150' },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [currentItems, setCurrentItems] = useState<MenuItemType[]>([]);
  const itemsPerPage = 1;
  const totalPages = Math.ceil(menuItems.length / itemsPerPage);

  useEffect(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    setCurrentItems(menuItems.slice(indexOfFirstItem, indexOfLastItem));
  }, [currentPage]);

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {currentItems.map((item) => (
          <MenuItem
            key={item.id}
            name={item.name}
            description={item.description}
            price={item.price}
            image={item.image}
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
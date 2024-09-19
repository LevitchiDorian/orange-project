import { useState, useEffect } from 'react';
import MenuItem from '../MenuItem/MenuItem';
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
    { id: 3, name: 'Veggie', description: 'Mixed vegetables, mozzarella', price: '125.00 MDL', image: 'https://via.placeholder.com/150' },
    { id: 4, name: 'BBQ Chicken', description: 'BBQ sauce, chicken, onions', price: '150.00 MDL', image: 'https://via.placeholder.com/150' },
    { id: 5, name: 'Hawaiian', description: 'Pineapple, ham, cheese', price: '140.00 MDL', image: 'https://via.placeholder.com/150' },
    { id: 6, name: 'Four Cheese', description: 'Mozzarella, parmesan, blue cheese, cheddar', price: '160.00 MDL', image: 'https://via.placeholder.com/150' },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [currentItems, setCurrentItems] = useState<MenuItemType[]>([]); // Correct type applied
  const itemsPerPage = 1;
  const totalPages = Math.ceil(menuItems.length / itemsPerPage);

  useEffect(() => {
    // Recalculate items whenever currentPage changes
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    setCurrentItems(menuItems.slice(indexOfFirstItem, indexOfLastItem));
  }, [currentPage]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={currentPage === i ? styles.activePage : ''}
          >
            {i}
          </button>
        );
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 3; i++) {
          pageNumbers.push(
            <button
              key={i}
              onClick={() => handlePageChange(i)}
              className={currentPage === i ? styles.activePage : ''}
            >
              {i}
            </button>
          );
        }
        pageNumbers.push(<span key="ellipsis1">...</span>);
        pageNumbers.push(
          <button
            key={totalPages}
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </button>
        );
      } else if (currentPage > 3 && currentPage < totalPages - 2) {
        pageNumbers.push(
          <button key={1} onClick={() => handlePageChange(1)}>
            1
          </button>
        );
        pageNumbers.push(<span key="ellipsis1">...</span>);

        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(
            <button
              key={i}
              onClick={() => handlePageChange(i)}
              className={currentPage === i ? styles.activePage : ''}
            >
              {i}
            </button>
          );
        }

        pageNumbers.push(<span key="ellipsis2">...</span>);
        pageNumbers.push(
          <button
            key={totalPages}
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </button>
        );
      } else {
        pageNumbers.push(
          <button key={1} onClick={() => handlePageChange(1)}>
            1
          </button>
        );
        pageNumbers.push(<span key="ellipsis1">...</span>);

        for (let i = totalPages - 2; i <= totalPages; i++) {
          pageNumbers.push(
            <button
              key={i}
              onClick={() => handlePageChange(i)}
              className={currentPage === i ? styles.activePage : ''}
            >
              {i}
            </button>
          );
        }
      }
    }

    return pageNumbers;
  };

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


      <div className={styles.pagination}>
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>

        {renderPageNumbers()}

        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default RestaurantMenu;

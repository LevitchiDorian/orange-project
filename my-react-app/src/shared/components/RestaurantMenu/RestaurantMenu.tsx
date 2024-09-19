


import MenuItem from '../MenuItem/MenuItem';
import styles from './RestaurantMenu.module.css';

const RestaurantMenu = () => {
  const menuItems = [
    {
      id: 1,
      name: 'Pepperoni',
      description: 'Pepperoni, cheese, and tomato sauce',
      price: '145.00 MDL',
      image: 'https://via.placeholder.com/150', // Placeholder image
    },
    {
      id: 2,
      name: 'Margherita',
      description: 'Tomato, mozzarella, and basil',
      price: '135.00 MDL',
      image: 'https://via.placeholder.com/150', // Placeholder image
    },
    {
      id: 3,
      name: 'Margherita',
      description: 'Tomato, mozzarella, and basil',
      price: '135.00 MDL',
      image: 'https://via.placeholder.com/150', // Placeholder image
    },
    {
      id: 4,
      name: 'Margherita',
      description: 'Tomato, mozzarella, and basil',
      price: '135.00 MDL',
      image: 'https://via.placeholder.com/150', // Placeholder image
    },
  ];
  

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img
          src="https://via.placeholder.com/100"
          alt="Restaurant Logo"
          className={styles.restaurantImage}
        />
        <h1 className={styles.title}>Andy’s</h1>
      </div>

      <select aria-label="Filter items" className={styles.filter}>
        <option value="all">All</option>
        <option value="pizza">Pizza</option>
        <option value="salads">Salads</option>
      </select>

      <div className={styles.grid}>
        {menuItems.map((item) => (
          <MenuItem
            key={item.id}
            name={item.name}
            description={item.description}
            price={item.price}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
};

export default RestaurantMenu;
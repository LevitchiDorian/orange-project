import React from 'react';
import QuantitySelector from '../QuantitySelector/QuantitySelector'; 
import styles from './MenuItem.module.css';

interface MenuItemProps {
  name: string;
  description: string;
  price: string;
  image: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ name, description, price, image }) => {
  const handleQuantityChange = (quantity: number) => {
    console.log(`Selected quantity for ${name}: ${quantity}`);
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={image} className={styles.cardImg} alt={name} />
      </div>

      <div className={styles.contentContainer}>
        <h3 className={styles.cardTitle}>{name}</h3>
        <p className={styles.cardDescription}>{description}</p>
        <span className={styles.price}>{price}</span>

        <div className={styles.actionButtons}>
          <QuantitySelector onQuantityChange={handleQuantityChange} />
          <button className={styles.addButton}>Add</button>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
import React from 'react';
import styles from './MenuItem.module.css';

interface MenuItemProps {
  name: string;
  description: string;
  price: string;
  image: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ name, description, price, image }) => {
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
          <div className={styles.quantityWrapper}>
            <button className={styles.quantityBtn}>-</button>
            <input type="number" defaultValue={1} className={styles.quantityInput} min={1} />
            <button className={styles.quantityBtn}>+</button>
          </div>
          <button className={styles.addButton}>Add</button>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
import React, { useState } from 'react';
import QuantitySelector from '../QuantitySelector/QuantitySelector'; 
import styles from './MenuItem.module.css';

interface MenuItemType {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
}

interface MenuItemProps {
  menuItem: MenuItemType;
  onAddToCart: (menuItem: MenuItemType, quantity: number) => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ menuItem, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    onAddToCart(menuItem, quantity);  // Pass the full menuItem object
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={menuItem.image} className={styles.cardImg} alt={menuItem.name} />
      </div>

      <div className={styles.contentContainer}>
        <h3 className={styles.cardTitle}>{menuItem.name}</h3>
        <p className={styles.cardDescription}>{menuItem.description}</p>
        <span className={styles.price}>{menuItem.price}</span>

        <div className={styles.actionButtons}>
          <QuantitySelector onQuantityChange={handleQuantityChange} />
          <button className={styles.addButton} onClick={handleAddToCart}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
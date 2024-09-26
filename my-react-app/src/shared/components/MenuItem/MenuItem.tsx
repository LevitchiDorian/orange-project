import React, { useState } from 'react';
import QuantitySelector from '../QuantitySelector/QuantitySelector';
import styles from './MenuItem.module.css';
import { IItemDTO } from '../../../entities/ItemDTO';

interface MenuItemProps {
  menuItem: IItemDTO;
  onAddToCart: (menuItem: IItemDTO, quantity: number) => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ menuItem, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    onAddToCart(menuItem, quantity);
  };

  const imageSrc = menuItem.image && menuItem.image.length > 0 
    ? `data:image/jpeg;base64,${menuItem.image}` 
    : 'https://via.placeholder.com/150'; 

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={imageSrc} className={styles.cardImg} alt={menuItem.dishName || 'Menu item'} />
      </div>

      <div className={styles.contentContainer}>
        <h3 className={styles.cardTitle}>{menuItem.dishName || 'No name'}</h3>
        <p className={styles.cardDescription}>{menuItem.description || 'No description available'}</p>
        <span className={styles.price}>{menuItem.price.toFixed(2)} MDL</span>

        <div className={styles.actionButtons}>
          <QuantitySelector onQuantityChange={handleQuantityChange} initialQuantity={quantity} />
          <button className={styles.addButton} onClick={handleAddToCart}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;

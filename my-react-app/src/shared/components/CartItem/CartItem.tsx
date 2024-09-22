import React from 'react';
import QuantitySelector from '../QuantitySelector/QuantitySelector'; 
import styles from './CartItem.module.css';

interface CartItemProps {
  id: number;
  name: string;
  description: string;
  price: string;
  quantity: number;
  image: string;
  onQuantityChange: (id: number, quantity: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ id, name, description, price, quantity, image, onQuantityChange }) => {

  const handleQuantityChange = (newQuantity: number) => {
    onQuantityChange(id, newQuantity); 
  };

  return (
    <div className={styles.cartItem}>
      <div className={styles.imageContainer}>
        <img src={image} alt={name} className={styles.cartImg} />
      </div>

      <div className={styles.contentContainer}>
        <h3 className={styles.cartTitle}>{name}</h3>
        <p className={styles.cartDescription}>{description}</p>
        <span className={styles.price}>Price: {price}</span>

        <div className={styles.actionButtons}>
          <QuantitySelector
            initialQuantity={quantity}
            onQuantityChange={handleQuantityChange}
            allowZero={true}
          />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
import React from 'react';
import QuantitySelector from '../QuantitySelector/QuantitySelector';
import styles from './CartItem.module.css';

interface CartItemProps {
  id: number;
  dishName: string;
  description: string;
  price: number;
  quantity: number;
  image: string[] | null; 
  onQuantityChange: (id: number, quantity: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ id, dishName, description, price, quantity, image = [], onQuantityChange }) => {
  const handleQuantityChange = (newQuantity: number) => {
    onQuantityChange(id, newQuantity);
  };



  const imageSrc = image && image.length > 0 
    ? `data:image/jpeg;base64,${image}` 
    : 'https://via.placeholder.com/150'; 

  return (
    <div className={styles.cartItem}>
      <div className={styles.imageContainer}>
        <img 
          src={imageSrc} 
          alt={dishName} 
          className={styles.cartImg} 
        />
      </div>
      <div className={styles.contentContainer}>
        <h3 className={styles.cartTitle}>{dishName}</h3>
        <p className={styles.cartDescription}>{description}</p>
        <span className={styles.price}>{price.toFixed(2)} MDL</span>

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

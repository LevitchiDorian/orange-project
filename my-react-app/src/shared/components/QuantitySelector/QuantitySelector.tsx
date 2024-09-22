import React, { useState } from 'react';
import styles from './QuantitySelector.module.css';

interface QuantitySelectorProps {
  initialQuantity?: number;
  onQuantityChange?: (quantity: number) => void;
  allowZero?: boolean; 
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  initialQuantity = 1,
  onQuantityChange,
  allowZero = false,
}) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  const handleIncrease = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    if (onQuantityChange) onQuantityChange(newQuantity);
  };

  const handleDecrease = () => {
    if (allowZero || quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      if (onQuantityChange) onQuantityChange(newQuantity);
    }
  };

  return (
    <div className={styles.quantityWrapper}>
      <button className={styles.quantityBtn} onClick={handleDecrease}>-</button>
      <input 
        type="number" 
        value={quantity} 
        className={styles.quantityInput} 
        min={allowZero ? 0 : 1} 
        readOnly 
      />
      <button className={styles.quantityBtn} onClick={handleIncrease}>+</button>
    </div>
  );
};

export default QuantitySelector;
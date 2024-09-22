import React, { useEffect, useState } from 'react';
import CartItem from '../CartItem/CartItem'; 
import './CartContent.css'; 
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../../app/Router';

interface CartItemType {
  id: number;
  name: string;
  description: string;
  price: string;
  quantity: number;
  image: string;
}

const CartContent: React.FC = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState<CartItemType[]>([]);
  const [isCartLoaded, setIsCartLoaded] = useState(false);

  useEffect(() => {
    if (!isCartLoaded) {
      const storedCart = localStorage.getItem('cart');
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
      setIsCartLoaded(true);
    }
  }, [isCartLoaded]);

  const handleQuantityChange = (id: number, newQuantity: number) => {
    setCart((prevCart) => {
      const updatedCart = prevCart
        .map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
        .filter((item) => item.quantity > 0);

      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const handleButtonClick = () => {
    if (cart.length > 0) {
      navigate(AppRoutes.CART); 
    } else {
      navigate(AppRoutes.MAIN);
    }
  };

  return (
    <div className="cart-content">
      <div className="cart-header">
        <h2 className="cart-title">Your Cart</h2>
      </div>

      <div className="cart-items">
        {cart.length > 0 ? (
          cart.map((cartItem) => (
            <CartItem
              key={cartItem.id}
              id={cartItem.id}
              name={cartItem.name}
              description={cartItem.description}
              price={cartItem.price}
              quantity={cartItem.quantity}
              image={cartItem.image}
              onQuantityChange={handleQuantityChange}
            />
          ))
        ) : (
          <p>Coșul tău este gol.</p>
        )}
      </div>

      <div className="cart-actions">
        <button onClick={handleButtonClick}>
          {cart.length > 0 ? 'Finalizează Comanda' : 'Continuă Cumpărăturile'}
        </button>
      </div>
    </div>
  );
};

export default CartContent;
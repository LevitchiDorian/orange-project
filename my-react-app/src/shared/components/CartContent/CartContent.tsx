import { useSelector, useDispatch } from 'react-redux';
import CartItem from '../CartItem/CartItem';
import './CartContent.css';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../../app/Router';
import { RootState } from '../../../app/store';
import { updateQuantity, removeFromCart } from '../../../features/cart/cartSlice';

const CartContent: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const cart = useSelector((state: RootState) => state.cart.items);

  const totalPrice = cart.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity > 0) {
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    } else {
      dispatch(removeFromCart(id));
    }
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

      {cart.length > 0 && (
        <div className="cart-total">
          <h3>Total: {totalPrice.toFixed(2)} MDL</h3>
        </div>
      )}

      <div className="cart-actions">
        <button onClick={handleButtonClick}>
          {cart.length > 0 ? 'Finalizează Comanda' : 'Continuă Cumpărăturile'}
        </button>
      </div>
    </div>
  );
};

export default CartContent;

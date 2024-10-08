
import { useSelector, useDispatch } from 'react-redux';
import CartItem from '../CartItem/CartItem';
import './CartContent.css';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../../app/Router';
import { RootState } from '../../../app/store';
import { updateQuantity, removeFromCart } from '../../../features/cart/cartSlice';
import { addItemToOrder } from '../../../features/order/orderSlice';
import { orderType } from '../../../entities/enum/orderType';
import { useBooking } from '../../../hooks/useBooking';
import { IBookingDTO, BookingStatus } from '../../../entities/BookingDTO'; // Import IBookingDTO

const CartContent: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { submitBooking } = useBooking(); // Get the booking hook

  // Get cart items and current restaurant ID from Redux state
  const cart = useSelector((state: RootState) => state.cart.items);
  const order = useSelector((state: RootState) => state.order);
  const currentRestaurantId = useSelector((state: RootState) => state.cart.currentRestaurantId);

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Calculate the total number of items in the cart (sum of quantities)
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity > 0) {
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    } else {
      dispatch(removeFromCart(id));
    }
  };

  const handleButtonClick = async () => {
    if (cart.length > 0 && order.orderType) {
      // Dispatch each item in the cart to the order state
      cart.forEach(item => {
        dispatch(addItemToOrder({ itemId: item.id, quantity: item.quantity }));  // Adding individual items to the order
      });
  
      if (order.orderType === orderType.TAKEAWAY) {
        navigate(AppRoutes.FORM_TAKEAWAY, { state: { restaurantId: currentRestaurantId } });
      } else if (order.orderType === orderType.IN_RESTAURANT) {
        // Set a default value for bookingDate if it is undefined
        const bookingDate = order.bookingDetails?.bookingDate || new Date().toISOString(); // Use current date as a fallback
        
        // Construct the IBookingDTO object
        const bookingDTO: IBookingDTO = {
          name: order.bookingDetails?.name || '',
          phoneNumber: order.bookingDetails?.phoneNumber || '',
          mail: order.bookingDetails?.mail || '',
          noPeople: order.bookingDetails?.noPeople,
          preferences: order.bookingDetails?.preferences,
          locationId: order.bookingDetails?.locationId || 0,
          tableId: order.bookingDetails?.tableId,
          itemIds: cart.flatMap(item => Array(item.quantity).fill(item.id)), // Collect item IDs from the cart
          status: BookingStatus.IN_PROGRESS, // Set status to IN_PROGRESS
          bookingDate, // Ensure bookingDate is always a valid string
        };
  
        // Pass the IBookingDTO object to the submitBooking function
        try {
          console.log(bookingDTO);
          await submitBooking(bookingDTO);
          navigate(AppRoutes.MAIN);  // Redirect to the main page after successful booking
        } catch (error) {
          console.error('Error finishing the booking:', error);
        }
      } else {
        console.error('Order type not set!');
      }
    } else {
      navigate(AppRoutes.MAIN);
    }
  };

  return (
    <div className="cart-content">
      <div className="cart-header">
        <h2 className="cart-title">Coșul Tău</h2>
        <div className='cart-quantity'>{totalItems}</div>
      </div>

      <div className="cart-items">
        {cart.length > 0 ? (
          cart.map((cartItem) => (
            <CartItem
              key={cartItem.id}
              id={cartItem.id}
              dishName={cartItem.dishName}
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
          {cart.length > 0 ? (order.orderType === orderType.IN_RESTAURANT ? 'Finalizează Comanda' : 'Continuă') : 'Continuă Cumpărăturile'}
        </button>
      </div>
    </div>
  );
};

export default CartContent;

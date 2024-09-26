import { useDispatch } from 'react-redux';
import { useCreateBookingMutation } from '../store/apiSlice';  
import { clearCart } from '../features/cart/cartSlice';
import { clearOrder } from '../features/order/orderSlice';
import { IBookingDTO, BookingStatus } from '../entities/BookingDTO';

export const useBooking = () => {
  const dispatch = useDispatch();
  const [createBooking] = useCreateBookingMutation();

  const submitBooking = async (bookingDetails: IBookingDTO) => {
    try {
      const booking: IBookingDTO = {
        ...bookingDetails,
        status: BookingStatus.IN_PROGRESS,
      };

      // Create booking in backend
      await createBooking(booking);
      dispatch(clearCart());
      dispatch(clearOrder());
      console.log('Booking created successfully:', booking);
    } catch (error) {
      console.error('Error creating booking:', error);
    }
  };

  return { submitBooking };
};
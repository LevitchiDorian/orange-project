import { useDispatch } from 'react-redux';
import { useCreateBookingMutation } from '../store/apiSlice';  
import { clearCart } from '../features/cart/cartSlice';
import { clearOrder } from '../features/order/orderSlice';
import { addNotification } from '../features/notification/notificationSlice';
import { IBookingDTO, BookingStatus } from '../entities/BookingDTO';
import { v4 as uuidv4 } from 'uuid'; // Correctly import uuid

export const useBooking = () => {
  const dispatch = useDispatch();
  const [createBooking] = useCreateBookingMutation();

  const submitBooking = async (bookingDetails: IBookingDTO) => {
    try {
      const booking: IBookingDTO = {
        ...bookingDetails,
        status: BookingStatus.IN_PROGRESS,
      };

      // Create booking in the backend
      await createBooking(booking);

      // Clear cart and order after successful booking
      dispatch(clearCart());
      dispatch(clearOrder());

      // Dispatch success notification
      dispatch(
        addNotification({
          id: uuidv4(), // Generate unique ID using uuid
          type: 'success',
          message: 'Rezervare creată cu succes!',
          description: `Rezervarea pentru ${bookingDetails.name} a fost creată cu succes. Detaliile rezervării le puteți verifica pe poșta electronică: ${bookingDetails.mail}`,
        })
      );
    } catch (error) {
      // Dispatch error notification
      dispatch(
        addNotification({
          id: uuidv4(), // Generate unique ID for the error notification
          type: 'error',
          message: 'Eroare la crearea rezervării!',
          description: 'A apărut o problemă la crearea rezervării. Vă rugăm să încercați din nou.',
        })
      );

      console.error('Eroare la crearea rezervării:', error);
    }
  };

  return { submitBooking };
};

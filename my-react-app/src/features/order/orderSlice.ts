import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { orderType } from '../../entities/enum/orderType';



interface BookingDetails {
  name: string;
  phoneNumber: string;
  email: string;
  locationId: number;
  tableId?: number | null;
  noPeople?: number;
  preferences?: string;
}

interface OrderState {
  orderType: orderType | null;
  bookingDetails: BookingDetails | null;
  items: number[];
  currentRestaurantId: number | null;
}

const initialState: OrderState = {
  orderType: null,
  bookingDetails: null,
  items: [],
  currentRestaurantId: null,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrderType(state, action: PayloadAction<orderType>) {
      state.orderType = action.payload;
    },
    setCurrentRestaurant(state, action: PayloadAction<number>) {
        state.currentRestaurantId = action.payload;
      },
    setBookingDetails(state, action: PayloadAction<BookingDetails>) {
      state.bookingDetails = action.payload;
    },
    addItemToOrder(state, action: PayloadAction<{itemId: number, quantity: number}>) {
      const { itemId, quantity } = action.payload;

      for (let i = 0; i < quantity; i++) {
        state.items.push(itemId);
      }
    },
    clearOrder(state) {
      state.orderType = null;
      state.items = [];
      state.bookingDetails = null;
      state.currentRestaurantId = null;
    }
  },
});

export const { 
    setOrderType,
    setCurrentRestaurant,
    setBookingDetails,
    addItemToOrder,
    clearOrder } = orderSlice.actions;
export default orderSlice.reducer;

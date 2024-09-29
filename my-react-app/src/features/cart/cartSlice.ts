import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IItemDTO } from '../../entities/ItemDTO';

interface CartItem extends IItemDTO {
  quantity: number;
  restaurantId: number;
}

interface CartState {
  items: CartItem[];
  currentRestaurantId: number | null; 
}

const initialState: CartState = {
  items: [],
  currentRestaurantId: null, 
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<{ item: CartItem; restaurantId: number }>) {
      const { item, restaurantId } = action.payload;

      // Check if the cart has items from a different restaurant
      if (state.currentRestaurantId === null || state.currentRestaurantId === restaurantId) {
        // Add item to the cart, updating if it already exists
        const existingIndex = state.items.findIndex(cartItem => cartItem.id === item.id);
        if (existingIndex >= 0) {
          state.items[existingIndex].quantity += item.quantity;
        } else {
          state.items.push(item);
        }
        // Set the current restaurant ID if it's not already set
        state.currentRestaurantId = restaurantId;
      } else {
        // Show a notification or handle the scenario where items from another restaurant are being added
        // This logic should be handled in the UI
        console.log('Nu se pot adăuga articole dintr-un alt restaurant. Vă rugăm să goliți mai întâi coșul.');
      }
    },
    removeFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter(item => item.id !== action.payload);
      // If the cart becomes empty, reset the currentRestaurantId
      if (state.items.length === 0) {
        state.currentRestaurantId = null;
      }
    },
    updateQuantity(state, action: PayloadAction<{ id: number; quantity: number }>) {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    clearCart(state) {
      state.items = [];
      state.currentRestaurantId = null; // Reset restaurant tracking when cart is cleared
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

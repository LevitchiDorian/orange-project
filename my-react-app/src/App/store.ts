import { configureStore } from '@reduxjs/toolkit';
import apiSlice from '../store/apiSlice';
import cartReducer from '../features/cart/cartSlice'
import orderReducer from '../features/order/orderSlice'
import spinnerReducer from '../features/spinner/spinnerSlice'


export const store = configureStore({
  reducer: {
    spinner: spinnerReducer,
    order: orderReducer,
    cart: cartReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

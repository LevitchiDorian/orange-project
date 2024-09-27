// spinnerSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { isAnyOf } from '@reduxjs/toolkit';
import apiSlice from '../../store/apiSlice';
 // Update path if needed

const spinnerSlice = createSlice({
  name: 'loading',
  initialState: false,
  reducers: {},
  extraReducers: (builder) => {
    // Instead of using 'state', you can directly return true/false.
    builder
      .addMatcher(
        isAnyOf(
          apiSlice.endpoints.getAllRestaurants.matchPending,
          apiSlice.endpoints.getMenuByRestaurantId.matchPending,
          apiSlice.endpoints.getLocationsByRestaurantId.matchPending,
          apiSlice.endpoints.getTablesByLocationId.matchPending,
          apiSlice.endpoints.getAllCategories.matchPending,
          apiSlice.endpoints.checkFreeTableByLocationId.matchPending,
          apiSlice.endpoints.createBooking.matchPending
        ),
        () => true // Set loading to true when any request is pending
      )
      .addMatcher(
        isAnyOf(
          apiSlice.endpoints.getAllRestaurants.matchFulfilled,
          apiSlice.endpoints.getMenuByRestaurantId.matchFulfilled,
          apiSlice.endpoints.getLocationsByRestaurantId.matchFulfilled,
          apiSlice.endpoints.getTablesByLocationId.matchFulfilled,
          apiSlice.endpoints.getAllCategories.matchFulfilled,
          apiSlice.endpoints.checkFreeTableByLocationId.matchFulfilled,
          apiSlice.endpoints.createBooking.matchFulfilled,
          apiSlice.endpoints.getAllRestaurants.matchRejected,
          apiSlice.endpoints.getMenuByRestaurantId.matchRejected,
          apiSlice.endpoints.getLocationsByRestaurantId.matchRejected,
          apiSlice.endpoints.getTablesByLocationId.matchRejected,
          apiSlice.endpoints.getAllCategories.matchRejected,
          apiSlice.endpoints.checkFreeTableByLocationId.matchRejected,
          apiSlice.endpoints.createBooking.matchRejected
        ),
        () => false // Set loading to false when requests are fulfilled or rejected
      );
  },
});

export default spinnerSlice.reducer;

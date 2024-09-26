import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IRestaurantDTO } from '../entities/RestaurantDTO';
import { IMenuDTO } from '../entities/MenuDTO';
import { ILocationDTO } from '../entities/LocationDTO';
import { ICategoryDTO } from '../entities/CategoryDTO';
import { IBookingDTO } from '../entities/BookingDTO';
import { ITableDTO } from '../entities/TableDTO';

const apiSlice = createApi({
  reducerPath: 'restaurantApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Restaurant', 'Menu', 'Location', 'Category', 'Booking'],
  endpoints: (builder) => ({
    getAllRestaurants: builder.query<IRestaurantDTO[], { categoryIds: number[]; restaurantName: string }>({
      query: ({ categoryIds, restaurantName }) => ({
        url: '/restaurant-resource',
        method: 'POST',
        body: { categoryIds, restaurantName },
      }),
      providesTags: ['Restaurant'],
    }),
    getMenuByRestaurantId: builder.query<IMenuDTO, number>({
      query: (restaurantId) => ({
        url: `/restaurant-resource/menu/${restaurantId}`,
        method: 'GET',
      }),
      providesTags: ['Menu'],
    }),
    getLocationsByRestaurantId: builder.query<ILocationDTO[], number>({
      query: (restaurantId) => ({
        url: `/restaurant-resource/locations/${restaurantId}`,
        method: 'GET',
      }),
      providesTags: ['Location'],
    }),
    getTablesByLocationId: builder.query<ITableDTO[], number>({
      query: (locationId) => ({
        url: `/restaurant-resource/tables/${locationId}`,
        method: 'GET',
      }),
      providesTags: ['Location'],
    }),
    getAllCategories: builder.query<ICategoryDTO[], void>({
      query: () => ({
        url: '/category',
        method: 'GET',
      }),
      providesTags: ['Category'],
    }),
    checkFreeTableByLocationId: builder.query<boolean, number>({
      query: (locationId) => ({
        url: `/restaurant-resource/restaurants/has-free-table/${locationId}`,
        method: 'GET',
      }),
      providesTags: [],
    }),
    createBooking: builder.mutation<void, IBookingDTO>({
      query: (booking) => ({
        url: '/booking',
        method: 'POST',
        body: booking,
      }),
      invalidatesTags: ['Booking'],
    }),
  }),
});

export const {
  useGetAllRestaurantsQuery,
  useGetMenuByRestaurantIdQuery,
  useGetLocationsByRestaurantIdQuery,
  useGetTablesByLocationIdQuery,
  useGetAllCategoriesQuery,
  useCheckFreeTableByLocationIdQuery,
  useCreateBookingMutation, 
} = apiSlice;

export default apiSlice;

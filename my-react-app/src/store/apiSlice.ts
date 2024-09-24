import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IRestaurantDTO } from '../entities/RestaurantDTO';
import { IMenuDTO } from '../entities/MenuDTO';
import { ILocationDTO } from '../entities/LocationDTO';
import { ICategoryDTO } from '../entities/CategoryDTO'; 

const apiSlice = createApi({
  reducerPath: 'restaurantApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }), 
  tagTypes: ['Restaurant', 'Menu', 'Location', 'Category'],
  endpoints: (builder) => ({
    getAllRestaurants: builder.query<IRestaurantDTO[], { categoryIds: number[]; restaurantName: string }>({
      query: ({ categoryIds, restaurantName }) => {
        return {
          url: '/restaurant-resource',
          method: 'POST',
          body: { categoryIds, restaurantName },
        };
      },
      providesTags: ['Restaurant'],
    }),
    getMenuByRestaurantId: builder.query<IMenuDTO, number>({
      query: (restaurantId) => {
        return {
          url: `/restaurant-resource/menu/${restaurantId}`,
          method: 'GET',
        };
      },
      providesTags: ['Menu'],
    }),
    getLocationsByRestaurantId: builder.query<ILocationDTO[], number>({
      query: (restaurantId) => {
        return {
          url: `/restaurant-resource/locations/${restaurantId}`,
          method: 'GET',
        };
      },
      providesTags: ['Location'],
    }),
    getAllCategories: builder.query<ICategoryDTO[], void>({
      query: () => {
        return {
          url: '/category',
          method: 'GET',
        };
      },
      providesTags: ['Category'],
    }),
  }),
});

export const {  
  useGetAllRestaurantsQuery, 
  useGetMenuByRestaurantIdQuery, 
  useGetLocationsByRestaurantIdQuery, 
  useGetAllCategoriesQuery 
} = apiSlice;

export default apiSlice;

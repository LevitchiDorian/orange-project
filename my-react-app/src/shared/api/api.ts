// src/shared/api/api.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Restaurant } from '../../entities/restaurant';

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.example.com' }),
  endpoints: (builder) => ({

    getRestaurants: builder.query<Restaurant[], void>({
      query: () => 'restaurants',
    }),
    getRestaurantById: builder.query<Restaurant, string>({
      query: (id) => `restaurants/${id}`,
    }),
  }),
});

export const {  
  useGetRestaurantsQuery,
  useGetRestaurantByIdQuery
} = api;
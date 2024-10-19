import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  AllOrdersResponse,
  MessageResponse,
  NewOrderRequest,
  OrderDetailsResponse,
  UpdateOrderRequest,
} from "../../types/api-types";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/order`,
  }),
  tagTypes: ["order"],
  endpoints: (builder) => ({
    newOrder: builder.mutation<MessageResponse, NewOrderRequest>({
      query: (order) => ({
        url: "new",
        method: "POST",
        body: order,
      }),
      invalidatesTags: ["order"],
    }),
    updateOrder: builder.mutation<MessageResponse, UpdateOrderRequest>({
      query: ({ orderId, userId }) => ({
        url: `${orderId}?id=${userId}`,
        method: "PUT",
      }),
      invalidatesTags: ["order"],
    }),
    deleteOrder: builder.mutation<MessageResponse, UpdateOrderRequest>({
      query: ({ orderId, userId }) => ({
        url: `${orderId}?id=${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["order"],
    }),
    allOrders: builder.query<AllOrdersResponse, string>({
      query: (id) => `all?id=${id}`,
      providesTags: ["order"],
    }),
    myOrders: builder.query<AllOrdersResponse, string>({
      query: (id) => `my?user=${id}`,
      providesTags: ["order"],
    }),
    orderDetails: builder.query<OrderDetailsResponse, string>({
      query: (id) => id,
      providesTags: ["order"],
    }),
  }),
});

export const {
  useNewOrderMutation,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
  useAllOrdersQuery,
  useMyOrdersQuery,
  useOrderDetailsQuery,
} = orderApi;

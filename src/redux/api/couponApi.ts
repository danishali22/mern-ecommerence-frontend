import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AllCouponResponse, DeleteCouponRequest, MessageResponse, NewCouponRequest, UpdateCouponRequest, UpdateCouponResponse } from "../../types/api-types";

export const couponApi = createApi({
  reducerPath: "couponApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/coupon`,
  }),
  tagTypes: ["coupon"],
  endpoints: (builder) => ({
    allCoupons: builder.query<AllCouponResponse, string>({
      query: (id) => `all/?id=${id}`,
      providesTags: ["coupon"],
    }),
    newCoupon: builder.mutation<MessageResponse, NewCouponRequest>({
      query: ({ id, formData }) => ({
        url: `new?id=${id}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["coupon"],
    }),
    updateCoupon: builder.mutation<
      UpdateCouponResponse,
      UpdateCouponRequest
    >({
      query: ({ userId, couponId, formData }) => ({
        url: `${couponId}?id=${userId}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["coupon"],
    }),
    deleteCoupon: builder.mutation<MessageResponse, DeleteCouponRequest>({
      query: ({ userId, couponId }) => ({
        url: `${couponId}?id=${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["coupon"],
    }),
  }),
});

export const {
  useAllCouponsQuery,
  useNewCouponMutation,
  useUpdateCouponMutation,
  useDeleteCouponMutation,
} = couponApi;

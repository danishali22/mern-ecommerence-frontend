import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AllCouponResponse, CouponDetailsResponse, DeleteCouponRequest, GetCouponRequest, MessageResponse, NewCouponRequest, UpdateCouponRequest, UpdateCouponResponse } from "../../types/api-types";

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
    couponDetails: builder.query<CouponDetailsResponse, GetCouponRequest>({
      query: ({ userId, couponId }) => `${couponId}?id=${userId}`,
      providesTags: ["coupon"],
    }),
    newCoupon: builder.mutation<MessageResponse, NewCouponRequest>({
      query: ({ id, code, amount }) => {
        return {
          url: `new?id=${id}`,
          method: "POST",
          body: { code, amount },
        };
      },
      invalidatesTags: ["coupon"],
    }),
    updateCoupon: builder.mutation<UpdateCouponResponse, UpdateCouponRequest>({
      query: ({ userId, couponId, code, amount }) => ({
        url: `${couponId}?id=${userId}`,
        method: "PUT",
        body: { code, amount },
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
  useCouponDetailsQuery,
  useNewCouponMutation,
  useUpdateCouponMutation,
  useDeleteCouponMutation,
} = couponApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  AllCategoriesResponse,
  AllProductsResponse,
  DeleteProductRequest,
  MessageResponse,
  NewProductRequest,
  ProductDetailsResponse,
  SearchProductsRequest,
  SearchProductsResponse,
  UpdateProductRequest,
  UpdateProductResponse,
} from "../../types/api-types";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/product`,
  }),
  tagTypes: ["product"],
  endpoints: (builder) => ({
    latestProducts: builder.query<AllProductsResponse, string>({
      query: () => "latest",
      providesTags: ["product"],
    }),
    allProducts: builder.query<AllProductsResponse, string>({
      query: (id) => `admin-products/?id=${id}`,
      providesTags: ["product"],
    }),
    categrories: builder.query<AllCategoriesResponse, string>({
      query: () => "categories",
      providesTags: ["product"],
    }),
    searchProducts: builder.query<
      SearchProductsResponse,
      SearchProductsRequest
    >({
      query: ({ search, category, price, sort, page }) => {
        let base = `search?page=${page}`;

        if (search) base += `&search=${search}`;
        if (category) base += `&category=${category}`;
        if (price) base += `&price=${price}`;
        if (sort) base += `&sort=${sort}`;

        return base;
      },
      providesTags: ["product"],
    }),
    newProduct: builder.mutation<MessageResponse, NewProductRequest>({
      query: ({ id, formData }) => ({
        url: `new?id=${id}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["product"],
    }),
    productDetails: builder.query<ProductDetailsResponse, string>({
      query: (id) => id,
      providesTags: ["product"],
    }),
    updateProduct: builder.mutation<UpdateProductResponse, UpdateProductRequest>({
      query: ({userId, productId, formData}) => ({
        url: `${productId}?id=${userId}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["product"],
    }),
    deleteProduct: builder.mutation<MessageResponse, DeleteProductRequest>({
      query: ({userId, productId}) => ({
        url: `${productId}?id=${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["product"],
    }),
  }),
});

export const {
  useLatestProductsQuery,
  useAllProductsQuery,
  useCategroriesQuery,
  useSearchProductsQuery,
  useNewProductMutation,
  useProductDetailsQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;

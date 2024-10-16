import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AllCategoriesResponse, AllProductsResponse, SearchProductsRequest, SearchProductsResponse } from "../../types/api-types";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/product`,
  }),
  endpoints: (builder) => ({
    latestProducts: builder.query<AllProductsResponse, string>({
      query: () => "latest",
    }),
    allProducts: builder.query<AllProductsResponse, string>({
        query: (id) => `admin-products/?id=${id}`,
    }),
    categrories: builder.query<AllCategoriesResponse, string>({
      query: () => "categories",
    }),
    searchProducts: builder.query<SearchProductsResponse, SearchProductsRequest>({
      query: ({search, category, price, sort, page}) => {
        let base = `search?page=${page}`;

        if(search) base += `&search=${search}`;
        if(category) base += `&category=${category}`;
        if(price) base += `&price=${price}`;
        if(sort) base += `&sort=${sort}`;

        return base;
      },
    }),
  }),
});

export const {useLatestProductsQuery, useAllProductsQuery, useCategroriesQuery, useSearchProductsQuery} = productApi
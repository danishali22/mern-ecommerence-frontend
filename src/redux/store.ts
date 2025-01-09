import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./api/userApi";
import { userReducer } from "./reducer/userReducer";
import { productApi } from "./api/productApi";
import { cartReducer } from "./reducer/cartItemReducer";
import { orderApi } from "./api/order";
import { dashboardApi } from "./api/dashboard";
import { couponApi } from "./api/couponApi";

export const server = import.meta.env.VITE_SERVER;

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [couponApi.reducerPath]: couponApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,

    [userReducer.name]: userReducer.reducer,
    [cartReducer.name]: cartReducer.reducer,
  },
  middleware: (mid) =>
    mid().concat(
      userApi.middleware,
      productApi.middleware,
      couponApi.middleware,
      orderApi.middleware,
      dashboardApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>
import { Bar, CartItem, CouponType, Line, Order, Pie, Product, ShippingInfo, Stats, User } from "./types"

export type CustomError = {
    status: number,
    data: {
        message: string,
        success: boolean,
    }
}

export type MessageResponse = {
    success: boolean,
    message: string,
}

export type UserResponse = {
    success: boolean,
    data: User,
    message: string,
}

export type AllUsersResponse = {
    success: boolean,
    data: User[],
}

export type AllProductsResponse = {
    success: boolean,
    data: Product[],
}

export type AllCategoriesResponse = {
    success: boolean,
    data: string[],
}

export type SearchProductsResponse = AllProductsResponse & {
    total_pages: number,
    message: string,
}


export type AllOrdersResponse = {
    success: string,
    data: Order[],
    message: string,
}

export type OrderDetailsResponse = {
    success: string,
    data: Order,
    message: string,
}

export type StatsResponse = {
    success: boolean,
    data: Stats,
}

export type PieChartResponse = {
    success: boolean,
    data: Pie,
}
export type BarChartResponse = {
    success: boolean,
    data: Bar,
}
export type LineChartResponse = {
    success: boolean,
    data: Line,
}

export type SearchProductsRequest = {
    search: string,
    category: string,
    sort: string,
    price: number,
    page: number,
}

export type NewProductRequest = {
    id: string,
    formData: FormData,
}

export type ProductDetailsResponse = {
    success: boolean,
    data: Product,
    message: string,
}

export type UpdateProductResponse = {
    success: boolean,
    data: Product[],
    message: string,
}

export type UpdateProductRequest = {
    userId: string,
    productId: string,
    formData: FormData,
}

export type DeleteProductRequest = {
    userId: string,
    productId: string,
}

export type DeleteUserRequest = {
    userId: string,
    adminUserId: string,
}

export type NewOrderRequest = {
    shippingInfo: ShippingInfo,
    orderItems: CartItem[],
    subtotal: number,
    tax: number,
    shippingCharges: number,
    discount: number,
    total: number,
    user: string,
} 

export type UpdateOrderRequest = {
    orderId: string,
    userId: string,
}

export type AllCouponResponse = {
  success: boolean;
  message: string;
  data: CouponType[];
};

export type NewCouponRequest = {
  id: string;
  formData: FormData;
};

export type UpdateCouponRequest = {
  userId: string;
  couponId: string;
  formData: FormData;
};

export type UpdateCouponResponse = {
  success: boolean;
  message: string;
  data: CouponType;
};

export type DeleteCouponRequest = {
  userId: string;
  couponId: string;
};
import { CartItem, Order, Product, ShippingInfo, User } from "./types"

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

export type UpdateOrderRequest = {
    orderId: string,
    userId: string,
}
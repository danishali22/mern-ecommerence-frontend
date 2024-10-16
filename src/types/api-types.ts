import { Product, User } from "./types"

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
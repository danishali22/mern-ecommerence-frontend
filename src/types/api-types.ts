import { Product, User } from "./types"

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
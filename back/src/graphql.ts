
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface ProductInput {
    name: string;
    desc?: Nullable<string>;
    price: number;
    count: number;
}

export interface Product {
    id: number;
    name: string;
    desc?: Nullable<string>;
    price: number;
    count: number;
    categories: Category[];
}

export interface User {
    id: number;
    username: string;
    password: string;
    created_at: number;
}

export interface Order {
    id: number;
    user_id: number;
    created_at?: Nullable<Timestamp>;
    user?: Nullable<User>;
    items?: Nullable<OrderItem[]>;
}

export interface OrderItem {
    id: number;
    product_id: number;
    order_id: number;
    count: number;
    order: Order;
    product: Product;
}

export interface SignInResponse {
    access_token: string;
}

export interface RegistrationResponse {
    isSuccess: boolean;
}

export interface Cart {
    id: number;
    user_id: number;
    count: number;
    product_id: number;
    product?: Nullable<Product>;
}

export interface Category {
    id: number;
    name?: Nullable<string>;
    products?: Nullable<Product[]>;
}

export interface IQuery {
    isUserExisting(username: string): boolean | Promise<boolean>;
    cart(): Cart[] | Promise<Cart[]>;
    orders(): Order[] | Promise<Order[]>;
    order(id: number): Order | Promise<Order>;
    products(): Product[] | Promise<Product[]>;
    product(id: number): Product | Promise<Product>;
    categories(): Category[] | Promise<Category[]>;
    category(id: number): Category | Promise<Category>;
}

export interface IMutation {
    login(password: string, username: string): SignInResponse | Promise<SignInResponse>;
    registration(password: string, username: string): RegistrationResponse | Promise<RegistrationResponse>;
    addToCart(productId: number): Cart | Promise<Cart>;
    removeFromCart(id: number): Cart | Promise<Cart>;
    createOrderFromCart(): Order | Promise<Order>;
    removeOrder(id: number): boolean | Promise<boolean>;
    createProduct(payload: ProductInput): Product | Promise<Product>;
    deleteProduct(id: number): Product | Promise<Product>;
}

export interface ISubscription {
    productsUpdated(): Product[] | Promise<Product[]>;
}

export type Timestamp = any;
type Nullable<T> = T | null;


/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface ProductInput {
    name?: string;
    desc?: string;
    price?: number;
    count?: number;
}

export interface InputOrder {
    created_at?: number;
    items?: InputOrderItem[];
}

export interface InputOrderItem {
    count?: number;
    product_id?: number;
}

export interface IQuery {
    articles(): Article[] | Promise<Article[]>;
    article(id?: number): Article | Promise<Article>;
    products(category?: number): Product[] | Promise<Product[]>;
    product(id?: number): Product | Promise<Product>;
    categories(): Category[] | Promise<Category[]>;
    category(id?: number): Category | Promise<Category>;
    login(username?: string, password?: string): SignInResponse | Promise<SignInResponse>;
    registration(username?: string, password?: string): RegistrationResponse | Promise<RegistrationResponse>;
    cart(): Cart[] | Promise<Cart[]>;
    orders(): Order[] | Promise<Order[]>;
    order(): Order | Promise<Order>;
}

export interface Article {
    id?: number;
    title?: string;
    content?: string;
    created_at?: number;
    updated_at?: number;
}

export interface Product {
    id?: number;
    name?: string;
    desc?: string;
    price?: number;
    count?: number;
    categories?: Category[];
}

export interface Category {
    id?: number;
    name?: string;
    products?: Product[];
}

export interface IMutation {
    createProduct(product?: ProductInput): Product | Promise<Product>;
    addToCart(productId?: number): Cart | Promise<Cart>;
    addOrder(order?: InputOrder): Order | Promise<Order>;
    removeOrder(id?: number): SuccessResponse | Promise<SuccessResponse>;
    removeFromCart(id?: number): SuccessResponse | Promise<SuccessResponse>;
    createOrderFromCart(): Order | Promise<Order>;
}

export interface SignInResponse {
    access_token?: string;
}

export interface Cart {
    id?: number;
    count?: number;
    product?: Product;
}

export interface Order {
    id?: number;
    created_at?: number;
    items?: OrderItem[];
}

export interface OrderItem {
    id?: number;
    count?: number;
    product?: Product;
}

export interface RegistrationResponse {
    isSuccess?: boolean;
}

export interface SuccessResponse {
    isSuccess?: boolean;
}

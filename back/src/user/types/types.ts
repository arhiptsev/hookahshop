import { OrderItem } from "../entities/order-item.entity";
import { Order } from "../entities/order.entity";

export interface SignInResponse {
    access_token: string;
}

export interface RegistrationResponse {
    isSuccess: Boolean
}

export interface OrderInputData extends Pick<Order, 'user_id' | 'created_at'> {
    items: Pick<OrderItem, 'product_id' | 'count'>[];
};


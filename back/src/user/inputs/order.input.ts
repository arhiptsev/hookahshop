import { Field, InputType, Int } from "@nestjs/graphql";
import { OrderItem } from "../models/order-item";
import { User } from "./user.input";


@InputType()
export class Order {


    @Field()
    user_id: number;

    @Field(() => Int)
    created_at: number;

    @Field(() => User)
    user: User;

    @Field(() => [OrderItem])
    items: OrderItem[];
}
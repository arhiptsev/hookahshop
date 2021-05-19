import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";
import { OrderItem } from "../models/order-item";

@ObjectType()
export class SignInResponse {
    @Field()
    access_token: string;
}

@ObjectType()
export class RegistrationResponse {
    @Field(() => Boolean)
    isSuccess: boolean;
}

@InputType()
export class OrderInput {
    @Field(() => Int)
    user_id: number;

    @Field(() => Int)
    created_at: number;


    @Field(() => [OrderItem])
    items: OrderItem[];
};


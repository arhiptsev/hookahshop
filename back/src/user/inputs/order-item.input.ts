import { Field, InputType, } from "@nestjs/graphql";
import { Product } from "src/products/models/product";
import { OrderInput } from "../types/types";

@InputType()
export class OrderItemInput {
    @Field()
    id: number;

    @Field()
    product_id: number;

    @Field()
    order_id: number;

    @Field()
    count: number;

    @Field(() => OrderInput)
    order: OrderInput

    @Field(() => Product)
    product: Product
}
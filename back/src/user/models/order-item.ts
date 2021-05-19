import { Field, ObjectType } from "@nestjs/graphql";
import { Product } from "src/products/models/product";
import { Order } from "./order";

@ObjectType()
export class OrderItem {
    @Field()
    id: number;

    @Field()
    product_id: number;

    @Field()
    order_id: number;

    @Field()
    count: number;

    @Field(() => Order)
    order: Order

    @Field(() => Product)
    product: Product
}
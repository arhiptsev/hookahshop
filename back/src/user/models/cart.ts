import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Product } from "src/products/models/product";

@ObjectType()
export class Cart {
    @Field(() => Int)
    id: number;

    @Field(() => Int)
    user_id: number;

    @Field(() => Int)
    count: number;

    @Field(() => Int)
    product_id: number;

    @Field(() => Product, { nullable: true })
    product?: Product
}
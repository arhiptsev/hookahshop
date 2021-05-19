import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class CartInput {
    @Field(() => Int)
    id: number;

    @Field(() => Int)
    user_id: number;

    @Field(() => Int)
    count: number;

    @Field(() => Int)
    product_id: number;
}
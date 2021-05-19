import { Field, GraphQLTimestamp, Int, ObjectType } from "@nestjs/graphql";
import { OrderItem } from "./order-item";
import { User } from "./user";


@ObjectType()
export class Order {
    @Field()
    id: number;

    @Field()
    user_id: number;

    @Field(() => GraphQLTimestamp, { nullable: true })
    created_at: bigint;

    @Field(() => User, { nullable: true })
    user?: User;

    @Field(() => [OrderItem], { nullable: true })
    items?: OrderItem[];
}
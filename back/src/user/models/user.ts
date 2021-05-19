import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class User {
    @Field(() => Int)
    id: number;

    @Field()
    username: string;

    @Field()
    password: string;

    @Field(() => Int)
    created_at: number;
}
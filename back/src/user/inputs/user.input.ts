import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
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
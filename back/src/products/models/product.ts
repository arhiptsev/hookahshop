import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Product {
    @Field(() => Int)
    id: number
    @Field()
    name: string
    @Field({ nullable: true })
    desc: string | null
    @Field(() => Int)
    price: number
    @Field(() => Int)
    count: number
}
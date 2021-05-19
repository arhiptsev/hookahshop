import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class ProductInput {
    @Field()
    name: string
    @Field({ nullable: true })
    desc: string | null
    @Field(() => Int)
    price: number
    @Field(() => Int)
    count: number
}
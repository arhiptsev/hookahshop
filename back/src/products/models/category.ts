import { Field, Int, ObjectType } from "@nestjs/graphql"
import { Product } from "./product"

@ObjectType()
export class Category {
    @Field(() => Int)
    id: number
    @Field({ nullable: true })
    name: string | null
    @Field(() => [Product], { nullable: true })
    products?: Product[] | null
}
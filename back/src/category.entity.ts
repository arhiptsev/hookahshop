import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm";
import { Product } from "./product.entity";

@Entity(
    { name: 'category' }
)
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(type => Product)
    @JoinTable({

        name: "product_category", // table name for the junction table of this relation
        joinColumn: {
            name: "c_id",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "p_id",
            referencedColumnName: "id"
        }
    })
    products: Product[]
}
import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm";
import { Category } from "./category.entity";

@Entity(
    { name: 'product' }
)
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    desc: string;

    @Column()
    price: number;

    @Column()
    count: number;

    @ManyToMany(type => Category)
    @JoinTable({
        name: "product_category",
        joinColumn: {
            name: "p_id",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "c_id",
            referencedColumnName: "id"
        }
    })
    categories!: Product[]
}


import { Product } from "src/product.entity";
import { Column, Entity,  JoinColumn,  ManyToMany,  OneToOne,  PrimaryGeneratedColumn } from "typeorm";

@Entity(
    { name: 'cart' }
)
export class Cart {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id: number;

    @Column()
    count: number;

    @Column()
    product_id: number;
    
    @OneToOne(type => Product)
    @JoinColumn({name: 'product_id'})
    product: Product
}
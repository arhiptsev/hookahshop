import { Product } from "src/product.entity";
import { Column, Entity,  JoinColumn,  ManyToMany,  ManyToOne,  OneToOne,  PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";

@Entity(
    { name: 'order_item' }
)
export class OrderItem {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    product_id: number;

    @Column()
    order_id: number;

    @Column()
    count: number;

    @ManyToOne(type => Order)
    @JoinColumn({name: 'order_id', referencedColumnName: 'id'})
    order: Order

    @OneToOne(type => Product, {eager: true})
    @JoinColumn({name: 'product_id'})
    product: Product
}
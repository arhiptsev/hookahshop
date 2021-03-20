import { Product } from "src/product.entity";
import { Column, Entity,  JoinColumn,  ManyToMany,  ManyToOne,  OneToMany,  OneToOne,  PrimaryGeneratedColumn } from "typeorm";
import { OrderItem } from "./order-item.entity";
import { User } from "./user.entity";

@Entity(
    { name: 'order' }
)
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id: number;

    @Column()
    created_at: number;


    @OneToOne(() => User)
    @JoinColumn({name: 'user_id'})
    user: User

    @OneToMany(() => OrderItem, item => item.order, {cascade: true})
    @JoinColumn({name: 'order_id', referencedColumnName: 'id'})
    items: OrderItem[]
}
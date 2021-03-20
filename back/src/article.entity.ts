import { Column, Entity, IsNull, PrimaryColumn, PrimaryGeneratedColumn, ManyToMany } from "typeorm";

@Entity(
    { name: 'article' }
)
export class Article {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    content: string;

    @Column()
    created_at: number;

    @Column()
    updated_at: number;
}
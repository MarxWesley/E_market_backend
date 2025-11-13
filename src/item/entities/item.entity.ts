import { Favorite } from "src/favorite/entities/favorite.entity";
import { Users } from "src/users/entities/users.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, TableInheritance } from "typeorm";

@Entity({ name: "Item" })
@TableInheritance({ column: { type: "varchar", name: "type" } })
export abstract class Item {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255, nullable: false })
    title: string;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
    price: number;

    @Column({ type: 'varchar', length: 255, nullable: false })
    category: string;

    @Column({ type: 'text', nullable: true })
    description?: string;

    @Column({ type: 'boolean', default: true })
    active: boolean;

    @ManyToOne(() => Users, (user) => user.items, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    })
    user: Users;

    @OneToMany(() => Favorite, (favorite) => favorite.item, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    })
    favorite: Favorite[];

    @CreateDateColumn()
    createdAt?: Date;

    @Column({ type: 'varchar', nullable: true, length: 100 })
    type: string;
}
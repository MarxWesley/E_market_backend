import { User } from "src/users/entities/users.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, TableInheritance } from "typeorm";

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

    @Column({ type: 'boolean' })
    active: boolean;

    @ManyToOne(() => User, (user) => user.items, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    })
    userId: User;

    @CreateDateColumn()
    createdAt?: Date;
}
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, TableInheritance } from "typeorm";

@Entity({name: "Item"})
@TableInheritance({column: {type: "varchar", name: "type"}})
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

    // userId: number; 
    // img

    @CreateDateColumn()
    createdAt?: Date;
}
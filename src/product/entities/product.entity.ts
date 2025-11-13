import { Item } from "src/item/entities/item.entity";
import { ChildEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, TableInheritance } from "typeorm";

@ChildEntity("product")
export class Product extends Item {
    @Column({ type: 'varchar', length: 255, nullable: false })
    condition: string;
}
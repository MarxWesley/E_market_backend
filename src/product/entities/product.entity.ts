import { Item } from "src/item/item.entity";
import { ChildEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, TableInheritance } from "typeorm";

@ChildEntity({ name: "product" })
export class Product extends Item {
    @Column({ type: 'varchar', length: 255, nullable: false })
    condition: string;
}
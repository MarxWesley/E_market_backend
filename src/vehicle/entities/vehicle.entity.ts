import { Item } from "src/item/entities/item.entity";
import { ChildEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@ChildEntity('vehicle')
export class Vehicle extends Item {
    @Column({ type: 'int', nullable: false })
    year: number;

    @Column({ type: 'varchar', length: 255, nullable: false })
    brand: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    model: string;

    @Column({ type: 'int', nullable: false })
    mileage: number;

    @Column({ type: "varchar", nullable: true })
    fuelType?: string;
    
    @Column({ type: "varchar", nullable: true })
    transmission?: string;
}
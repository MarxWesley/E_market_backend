import { Product } from "src/product/entities/product.entity";
import { ChildEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@ChildEntity({ name: 'vehicle' })
export class Vehicle extends Product {
    @Column({ type: 'varchar', length: 255, nullable: false })
    type: string;

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

    // images
    // userId
}
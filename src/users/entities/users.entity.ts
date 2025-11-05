import { Item } from "src/item/item.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "Users" })
export class Users {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    cpf: string;

    @Column()
    password: string;

    @OneToMany(() => Item, (item) => item.userId, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    })
    items: Item[]
}
import { Favorite } from "src/favorite/entities/favorite.entity";
import { Item } from "src/item/entities/item.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "Users" })
export class Users {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', name: 'name', nullable: false, length: 255})
    name: string;

    @Column({type: 'varchar', nullable: false, length: 255, unique: true})
    email: string;

    @Column({type: 'varchar', nullable: false, length: 14, unique: true})
    cpf: string;

    @Column({type: 'varchar', nullable: false, length: 100})
    password: string;

    @OneToMany(() => Item, (item) => item.user, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    })
    items: Item[]

    @OneToMany(() => Favorite, (favorite) => favorite.user, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    })
    favorite: Favorite[];
}
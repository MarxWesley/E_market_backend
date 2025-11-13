import { Users } from "src/users/entities/users.entity";
import { Item } from "src/item/entities/item.entity";
import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "Favorite" })
export class Favorite {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Users, (user) => user.favorite, {
        onDelete: "CASCADE",
    })
    user: Users;

    @ManyToOne(() => Item, (item) => item.favorite, {
        onDelete: "CASCADE",
    })
    item: Item;
}

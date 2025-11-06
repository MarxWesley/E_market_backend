import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Item } from "./item.entity";
import { Repository } from "typeorm";

@Injectable()
export class ItemRepository {
    constructor(
        @InjectRepository(Item)
        private readonly repo: Repository<Item> 
    ) {}

    async createItem(data: Partial<Item>): Promise<Item> {
        const item = this.repo.create(data);
        return await this.repo.save(item);
    }

    async findAll(): Promise<Item[]> {
        return await this.repo.find();
    }

    async findById(id: number): Promise<Item | null> {
        return await this.repo.findOneBy({id});
    }

    // async findByUser(userId: number): Promise<Item[]> {
    //     const userItems = this.repo.find({where: {userId}})

    //     return this.repo.find({
    //         where: { userId },
    //         order: {createdAt: "DESC"}
    //     })
    // }
    
    async findActive(): Promise<Item[]> {
        return  await this.repo.find({
            where: {active: true}
        })
    }

    async remove(id: number): Promise<void> {
        await this.repo.delete({id});
    }
}
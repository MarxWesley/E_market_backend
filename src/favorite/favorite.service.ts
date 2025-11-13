import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { Favorite } from './entities/favorite.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from 'src/item/entities/item.entity';
import { Vehicle } from 'src/vehicle/entities/vehicle.entity';
import { Product } from 'src/product/entities/product.entity';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectRepository(Favorite)
    private favoriteRepository: Repository<Favorite>,

    @InjectRepository(Item)
    private itemRepository: Repository<Item>,

    @InjectRepository(Vehicle)
    private vehicleRepository: Repository<Vehicle>,

    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) { }

  async create(createFavoriteDto: CreateFavoriteDto, user: any) {
    try {
      const existingItem = await this.itemRepository.findOne({
        where: { id: createFavoriteDto.itemId }
      });

      if (!existingItem) {
        throw new NotFoundException("Item não encontrado");
      }
 
      const favorite = this.favoriteRepository.create({
        item: { id: createFavoriteDto.itemId },
        user: { id: user.userId },
      });

      return await this.favoriteRepository.save(favorite);
    } catch (error) {
      throw ("Erro ao criar favorito: " + error);
    }
  }


  async findAll() {
    try {
      return await this.favoriteRepository.find({ relations: ['user', 'item'] });
    } catch (error) {
      throw ("Erro ao listar favoritos: " + error);
    }
  }

  async findOne(id: number) {
    try {
      const favorite = await this.favoriteRepository.findOne({ where: { id }, relations: ['user', 'item'] });

      if (!favorite) throw new Error("Favorito não encontrado")

      return favorite;
    } catch (error) {
      throw ("Erro ao buscar favorito: " + error);
    }
  }

  async remove(id: number, user: any) {
    try {
      const favorite = await this.findOne(id);

      if (favorite.user.id !== user.userId) {
        throw new Error("Você não tem permissão para deletar esse favorito");
      }

      return await this.favoriteRepository.delete(id);
    } catch (error) {
      throw ("Erro ao deletar favorito: " + error);
    }
  }
}

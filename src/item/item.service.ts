import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/product/entities/product.entity';
import { Vehicle } from 'src/vehicle/entities/vehicle.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ItemService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        @InjectRepository(Vehicle)
        private readonly vehicleRepository: Repository<Vehicle>,
    ) { }

    async findAll() {
        const products = await this.productRepository.find({
            where: { active: true },
            relations: ['user', 'favorite'],
            select: {
                user: {
                    id: true,
                    name: true,
                }
            }
        });

        const vehicles = await this.vehicleRepository.find({
            where: { active: true },
            relations: ['user', 'favorite'],
            select: {
                user: {
                    id: true,
                    name: true,
                }
            }
        });

        // Junta e retorna
        return [...products, ...vehicles];
    }

    async findOne(id: number) {
        // Busca em ambas as tabelas herdadas
        const product = await this.productRepository.findOne({
            where: { id },
            relations: ['user', 'favorite'],
            select: {
                user: {
                    id: true,
                    name: true,
                }
            }
        });

        if (!product) throw new NotFoundException('Item não encontrado');

        if (product) return product;

        const vehicle = await this.vehicleRepository.findOne({
            where: { id },
            relations: ['user', 'favorite'],
            select: {
                user: {
                    id: true,
                    name: true,
                }
            }
        });

        if (!vehicle) throw new NotFoundException('Item não encontrado');

        return vehicle;
    }

    async findByType(type: string) {
        if (type === 'product') {
            return await this.productRepository.find({
                where: { active: true },
                relations: ['user', 'favorite'],
                select: {
                    user: {
                        id: true,
                        name: true,
                    }
                }
            });
        } else if (type === 'vehicle') {
            return await this.vehicleRepository.find({
                where: { active: true },
                relations: ['user', 'favorite'],
                select: {
                    user: {
                        id: true,
                        name: true,
                    }
                }
            });
        } else {
            throw new NotFoundException('Tipo de item inválido');
        }
    }

    async updateStatus(id: number) {
        const item = await this.findOne(id);

        if (!item) {
            throw new NotFoundException('Item não encontrado');
        }

        item.active = !item.active;
        if (item.type === 'product') {
            return await this.productRepository.save(item as Product);
        } else if (item.type === 'vehicle') {
            return await this.vehicleRepository.save(item as Vehicle);
        }
    }
}

import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ILike, Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>
  ) { }

  create(createProductDto: CreateProductDto, user: any) {
    const product = this.productRepository.create({
      ...createProductDto,
      user: { id: user.userId },
    })

    console.log(product)

    return this.productRepository.save(product);
  }

  async findAll() {
    try {
      return await this.productRepository.find({ relations: ['user'] });
    } catch (error) {
      throw error
    }
  }

  async findOne(id: number) {
    try {
      const product = await this.productRepository.findOne({ where: { id }, relations: ['user'] });

      if (!product) throw new NotFoundException("Produto não encontrado")

      return product;

    } catch (error) {
      throw error
    }
  }

  async findByName(title: string) {
    try {
      const product = await this.productRepository.findOne(
        {
          where: [
            { title: ILike(`%${title}%`) },
            { description: ILike(`%${title}%`) }
          ]
        }
      );

      if (!product) throw new NotFoundException("Produto não encontrado")

      return product;

    } catch (error) {
      throw error
    }
  }

  async update(id: number, updateProductDto: UpdateProductDto, user: any) {
    const productToUpdate = await this.findOne(id);

    if (productToUpdate.user.id !== user.userId) {
      throw new ForbiddenException('Você não tem permissão para editar esse produto, pois pertence a outro usuário');
    }

    const updatedProduct = this.productRepository.merge(productToUpdate, updateProductDto);
    return this.productRepository.save(updatedProduct)
  }

  async remove(id: number, user: any) {
    const product = await this.findOne(id);

    if (product.user.id !== user.userId) {
      throw new ForbiddenException('Você não tem permissão para remover esse produto, pois pertence a outro usuário');
    }

    return this.productRepository.remove(product);
  }
}

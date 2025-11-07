import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>
  ) { }

  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }

  async findAll() {
    try {
      return await this.productRepository.find();
    } catch (error) {
      throw error
    }
  }

  async findOne(id: number) {
    try {
      const product = await this.productRepository.findOne({ where: { id } });

      if (!product) throw new NotFoundException("Produto não encontrado")

      return product;

    } catch (error) {
      throw error
    }
  }

  async findByName (title: string) {
    try {
      const product = await this.productRepository.findOne({ where: { title } });

      if (!product) throw new NotFoundException("Produto não encontrado")

      return product;

    } catch (error) {
      throw error
    }
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}

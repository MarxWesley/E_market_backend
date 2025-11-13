import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { Product } from 'src/product/entities/product.entity';
import { Vehicle } from 'src/vehicle/entities/vehicle.entity';
import { ProductModule } from 'src/product/product.module';
import { VehicleModule } from 'src/vehicle/vehicle.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Item, Product, Vehicle]),
    ProductModule,
    VehicleModule,
  ],
  controllers: [ItemController],
  providers: [ItemService],
  exports: [ItemService],
})
export class ItemModule { }
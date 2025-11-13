import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { Item } from 'src/item/entities/item.entity';
import { Favorite } from 'src/favorite/entities/favorite.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users, Item, Favorite])
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule { }
import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller('favorite')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Post()
  @ApiOperation({ summary: "Favoritar item" })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  async create(@Body() createFavoriteDto: CreateFavoriteDto, @Req() req) {
    return this.favoriteService.create(createFavoriteDto, req.user);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: "Listar todos favoritos" })
  @ApiBearerAuth('access-token')
  findAll() {
    return this.favoriteService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: "Listar favorito por id" })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  findOne(@Param('id') id: number) {
    return this.favoriteService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: "Desfavoritar um item pelo id" })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  remove(@Param('id') id: number, @Req() req) {
    return this.favoriteService.remove(id, req.user);
  }
}
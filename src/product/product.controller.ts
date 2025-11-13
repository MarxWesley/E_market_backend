import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Request, ParseIntPipe, Req } from '@nestjs/common';
import { ProductService } from './product.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: "Listar todos produtos ou buscar por filtros" })
  @ApiBearerAuth('access-token')
  @ApiQuery({ name: 'title', required: false, description: 'Filtrar produto pelo título ou descrição' })
  findAll(@Query('title') title?: string) {
    if (title) return this.productService.findByName(title);
    return this.productService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: "Listar produto por id" })
  findOne(@Param('id') id: number) {
    return this.productService.findOne(id);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: "Exclui produto pelo id" })
  @ApiParam({name: 'id', required: true, description: 'Remove produto pelo id'})
  remove(@Param('id') id: number, @Req() req) {
    return this.productService.remove(id, req.user);
  }
}
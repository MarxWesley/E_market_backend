import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Request, ParseIntPipe, Req } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post()
  @ApiOperation({ summary: "Cria um produto" })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  create(@Body() createProductDto: CreateProductDto, @Request() req) {
    return this.productService.create(createProductDto, req.user);
  }

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

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: "Atualiza produto por id" })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateProductDto: UpdateProductDto, @Req() req) {
    return this.productService.update(id, updateProductDto, req.user);
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
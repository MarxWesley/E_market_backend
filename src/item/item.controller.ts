import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query, Req, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ItemService } from './item.service';
import { ProductService } from 'src/product/product.service';
import { VehicleService } from 'src/vehicle/vehicle.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateProductDto } from 'src/product/dto/create-product.dto';
import { CreateVehicleDto } from 'src/vehicle/dto/create-vehicle.dto';
import { UpdateProductDto } from 'src/product/dto/update-product.dto';
import { UpdateVehicleDto } from 'src/vehicle/dto/update-vehicle.dto';

@ApiTags('Items')
@Controller('items')
export class ItemController {
    constructor(
        private readonly itemService: ItemService,
        private readonly productService: ProductService,
        private readonly vehicleService: VehicleService
    ) { }

    @Post('/product')
    @ApiOperation({ summary: "Cria um produto" })
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth('access-token')
    createProduct(@Body() createProductDto: CreateProductDto, @Request() req) {
        return this.productService.create(createProductDto, req.user);
    }

    @Patch('/product/:id')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: "Atualiza produto por id" })
    updateProduct(@Param('id', ParseIntPipe) id: number, @Body() updateProductDto: UpdateProductDto, @Req() req) {
        return this.productService.update(id, updateProductDto, req.user);
    }

    @Post('/vehicle')
    @ApiOperation({ summary: "Cria um veículo" })
    @ApiBearerAuth('access-token')
    @UseGuards(AuthGuard('jwt'))
    async createVehicle(@Body() createVehicleDto: CreateVehicleDto, @Request() req) {
        return this.vehicleService.create(createVehicleDto, req.user);
    }

    @Patch('/vehicle/:id')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: "Atualiza veículo por id" })
    updateVehicle(@Param('id') id: number, @Body() updateVehicleDto: UpdateVehicleDto, @Req() req) {
        return this.vehicleService.update(id, updateVehicleDto, req.user);
    }

    @Get()
    @ApiOperation({ summary: 'Listar todos os itens (produtos, veículos, etc.)' })
    @ApiQuery({ name: 'type', required: false, description: 'Filtrar por tipo de item' })
    findAll(@Query('type') type?: string) {
        if (type) {
            return this.itemService.findByType(type);
        }
        return this.itemService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Buscar item pelo ID' })
    findOne(@Param('id') id: number) {
        return this.itemService.findOne(id);
    }

    @Patch(':id/status')
    @ApiOperation({ summary: 'Alterar status ativo/inativo do item' })
    async updateStatus(@Param('id') id: number) {
        return await this.itemService.updateStatus(id);
    }
}
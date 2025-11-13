import { Controller, Get, Param, Patch, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ItemService } from './item.service';

@ApiTags('Itens')
@Controller('items')
export class ItemController {
    constructor(private readonly itemService: ItemService) { }

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
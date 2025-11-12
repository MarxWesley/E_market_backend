import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards, Query, Req } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller('vehicle')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Post()
  @ApiOperation({ summary: "Cria um veículo" })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() createVehicleDto: CreateVehicleDto, @Request() req) {
    return this.vehicleService.create(createVehicleDto, req.user);
  }

  @Get()
  @ApiOperation({ summary: "Listar todos veículos" })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  @ApiQuery({ name: 'title', required: false, description: 'Filtrar veículo pelo título ou descrição' })
  findAll(@Query('title') title?: string) {
    if (title) return this.vehicleService.findByName(title);
    return this.vehicleService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: "Listar veículo por id" })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('id') id: number) {
    return this.vehicleService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: "Atualiza veículo por id" })
  update(@Param('id') id: number, @Body() updateVehicleDto: UpdateVehicleDto, @Req() req) {
    return this.vehicleService.update(id, updateVehicleDto, req.user);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: "Exclui veículo pelo id" })
  @ApiParam({name: 'id', required: true, description: 'Remove veículo pelo id'})
  remove(@Param('id') id: number, @Req() req) {
    return this.vehicleService.remove(id, req.user);
  }
}

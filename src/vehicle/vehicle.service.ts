import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { ILike, Repository } from 'typeorm';

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(Vehicle)
    private vehicleRepository: Repository<Vehicle>
  ) { }

  async create(createVehicleDto: CreateVehicleDto, user: any) {
    const vehicle = this.vehicleRepository.create({
      ...createVehicleDto,
      user: { id: user.userId },
    });

    return await this.vehicleRepository.save(vehicle);
  }

  async findAll() {
    return await this.vehicleRepository.find({ relations: ['user'] });
  }


  async findOne(id: number) {
    try {
      const vehicle = await this.vehicleRepository.findOne({ where: { id }, relations: ['user'] });

      if (!vehicle) throw new NotFoundException("Veículo não encontrado")

      return vehicle;

    } catch (error) {
      throw error
    }
  }

  async findByName(title: string) {
    try {
      const vehicle = await this.vehicleRepository.findOne(
        {
          where: [
            { title: ILike(`%${title}%`) },
            { description: ILike(`%${title}%`) },
            { model: ILike(`%${title}%`) },
            { brand: ILike(`%${title}%`) },
            { type: ILike(`%${title}%`) },
          ]
        }
      );

      if (!vehicle) throw new NotFoundException("Veículo não encontrado")

      return vehicle;

    } catch (error) {
      throw error
    }
  }

  async update(id: number, updateVehicleDto: UpdateVehicleDto, user: any) {
    const vehicleToUpdate = await this.findOne(id);

    if (vehicleToUpdate.user.id !== user.userId) {
      throw new ForbiddenException('Você não tem permissão para editar esse veículo, pois pertence a outro usuário');
    }

    const vehicleUpdated = this.vehicleRepository.merge(vehicleToUpdate, updateVehicleDto);
    return this.vehicleRepository.save(vehicleUpdated)
  }

  async remove(id: number, user: any) {
    const vehicle = await this.findOne(id);

    if (vehicle.user.id !== user.userId) {
      throw new ForbiddenException('Você não tem permissão para remover esse veículo, pois pertence a outro usuário');
    }

    return this.vehicleRepository.remove(vehicle);
  }
}

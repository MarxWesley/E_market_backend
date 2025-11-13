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
    if (createVehicleDto.price <= 0) {
      throw new ForbiddenException('O preço do veículo deve ser maior que zero');
    }

    if (createVehicleDto.year < 1886) {
      throw new ForbiddenException('O ano do veículo não pode ser menor que 1886');
    } else if (createVehicleDto.year > new Date().getFullYear() + 1) {
      throw new ForbiddenException(`O ano do veículo não pode ser maior que ${new Date().getFullYear() + 1}`);
    }

    if (createVehicleDto.mileage < 0) {
      throw new ForbiddenException('A quilometragem do veículo não pode ser negativa');
    }

    const vehicle = this.vehicleRepository.create({
      ...createVehicleDto,
      user: { id: user.userId },
      type: 'vehicle',
    });

    return await this.vehicleRepository.save(vehicle);
  }

  async findAll() {
    return await this.vehicleRepository.find({
      relations: ['user'],
      select: {
        user: {
          id: true,
          name: true,
        }
      }
    });
  }


  async findOne(id: number) {
    try {
      const vehicle = await this.vehicleRepository.findOne({
        where: { id }, relations: ['user'], select: {
          user: {
            id: true,
            name: true,
          }
        }
      });

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
          ],
          select: {
            user: {
              id: true,
              name: true,
            }
          },
          relations: ['user']
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

    if (updateVehicleDto.price && updateVehicleDto.price <= 0) {
      throw new ForbiddenException('O preço do veículo deve ser maior que zero');
    }

    if (updateVehicleDto.year && updateVehicleDto.year < 1886) {
      throw new ForbiddenException('O ano do veículo não pode ser menor que 1886');
    } else if (updateVehicleDto.year && updateVehicleDto.year > new Date().getFullYear() + 1) {
      throw new ForbiddenException(`O ano do veículo não pode ser maior que ${new Date().getFullYear() + 1}`);
    }

    if (updateVehicleDto.mileage && updateVehicleDto.mileage < 0) {
      throw new ForbiddenException('A quilometragem do veículo não pode ser negativa');
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

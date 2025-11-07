import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { Users } from './entities/users.entity';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>
  ) { }

  async create(createUserDto: CreateUserDto) {
    const hash = await bcrypt.hash(createUserDto.password, 10);

    const user = this.usersRepository.create({
      ...createUserDto,
      password: hash
    })

    return this.usersRepository.save(user);
  }

  async findAll() {
    return await this.usersRepository.find()
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) throw new NotFoundException("Usuário não encontrado")

    return user;
  }

  async findByEmail(email: string) {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) throw new NotFoundException('Usuário não encontrado');
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const userToUpdate = await this.findOne(id);

    if (updateUserDto.email && updateUserDto.email !== userToUpdate.email) {
      const emailExists = await this.findByEmail(updateUserDto.email);

      if (emailExists) {
        throw new ConflictException('Este e-mail já está em uso por outro usuário.');
      }
    }

    const dataToUpdate = { ...updateUserDto };

    if (dataToUpdate.password) {
      dataToUpdate.password = await bcrypt.hash(dataToUpdate.password, 10);
    }

    // Atualiza e salva
    const updatedUser = this.usersRepository.merge(userToUpdate, dataToUpdate);
    return this.usersRepository.save(updatedUser);
  }

  async remove(id: number) {
    const user = await this.findOne(id);

    return this.usersRepository.remove(user);
  }
}
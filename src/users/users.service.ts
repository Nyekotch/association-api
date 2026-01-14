import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DeepPartial, Repository } from 'typeorm';
import {User} from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

  constructor(@InjectRepository(User)
    private readonly usersRepo: Repository<User>,){}

    async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const payload: DeepPartial<User> = {
      ...(createUserDto as any),
      password: hashedPassword,
    };
    const user = this.usersRepo.create(payload);
    return this.usersRepo.save(user);
  }

  findAll(): Promise<User[]> {
    return this.usersRepo.find();
  }

  findOne(id: string): Promise<User | null> {
    return this.usersRepo.findOne({ where: { id } });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User | null> {
    const dto: any = { ...updateUserDto };
    if (dto.password) {
      dto.password = await bcrypt.hash(dto.password, 10);
    }
    await this.usersRepo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepo.delete(id);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepo.findOne({ where: { email } });
  }

  async getStats() {
    const totalUsers = await this.usersRepo.count();
    const activeUsers = await this.usersRepo.count({ where: { isactive: true } });
    
    // Pour les événements et inscriptions, vous devrez ajouter ces services
    // Pour l'instant, retournons des valeurs par défaut
    return {
      totalUsers,
      totalEvents: 0,
      totalRegistrations: 0,
      activeUsers
    };
  }
}

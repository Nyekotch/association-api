import { Injectable } from '@nestjs/common';
import { CreateEventRegistrationDto } from './dto/create-event_registration.dto';
import { UpdateEventRegistrationDto } from './dto/update-event_registration.dto';
import { Repository } from 'typeorm';
import { EventRegistration } from './entities/event_registration.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EventRegistrationsService {
  constructor(
    @InjectRepository(EventRegistration)
    private readonly eventRegistrationsRepo: Repository<EventRegistration>,
  ) {}

  async create(createEventRegistrationDto: CreateEventRegistrationDto) {
    const registration = this.eventRegistrationsRepo.create(createEventRegistrationDto);
    return this.eventRegistrationsRepo.save(registration);
  }

  findAll() {
    return this.eventRegistrationsRepo.find({ relations: ['event', 'member'] });
  }

  findOne(id: string) {
    return this.eventRegistrationsRepo.findOne({ where: { id }, relations: ['event', 'member'] });
  }

  async update(id: string, updateEventRegistrationDto: UpdateEventRegistrationDto) {
    await this.eventRegistrationsRepo.update(id, updateEventRegistrationDto);
    return this.findOne(id);
  }

  async remove(id: string) {
    await this.eventRegistrationsRepo.delete(id);
  }
}

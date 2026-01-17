import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Repository } from 'typeorm';
import { Event } from './entities/event.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventsRepo: Repository<Event>,
  ) {}

  async create(createEventDto: CreateEventDto) {
    const event = this.eventsRepo.create(createEventDto);
    return this.eventsRepo.save(event);
  }

  findAll(organizerid?: string) {
    if (organizerid) {
      return this.eventsRepo.find({ 
        where: { organizerid }, 
        relations: ['organizer'] 
      });
    }
    return this.eventsRepo.find({ relations: ['organizer'] });
  }

  findOne(id: string) {
    return this.eventsRepo.findOne({ where: { id }, relations: ['organizer'] });
  }

  async update(id: string, updateEventDto: UpdateEventDto) {
    await this.eventsRepo.update(id, updateEventDto);
    return this.findOne(id);
  }

  async remove(id: string) {
    await this.eventsRepo.delete(id);
  }
}

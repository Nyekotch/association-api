import { Test, TestingModule } from '@nestjs/testing';
import { EventRegistrationsController } from './event_registrations.controller';
import { EventRegistrationsService } from './event_registrations.service';
import { Repository } from 'typeorm';
import { EventRegistration } from './entities/event_registration.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('EventRegistrationsController', () => {
  let controller: EventRegistrationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventRegistrationsController],
      providers: [
        EventRegistrationsService,
        {
          provide: getRepositoryToken(EventRegistration),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<EventRegistrationsController>(EventRegistrationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

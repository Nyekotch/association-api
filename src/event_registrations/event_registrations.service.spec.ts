import { Test, TestingModule } from '@nestjs/testing';
import { EventRegistrationsService } from './event_registrations.service';
import { Repository } from 'typeorm';
import { EventRegistration } from './entities/event_registration.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('EventRegistrationsService', () => {
  let service: EventRegistrationsService;
  let repository: Repository<EventRegistration>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<EventRegistrationsService>(EventRegistrationsService);
    repository = module.get<Repository<EventRegistration>>(getRepositoryToken(EventRegistration));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

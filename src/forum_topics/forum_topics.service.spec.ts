import { Test, TestingModule } from '@nestjs/testing';
import { ForumTopicsService } from './forum_topics.service';
import { Repository } from 'typeorm';
import { ForumTopic } from './entities/forum_topic.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('ForumTopicsService', () => {
  let service: ForumTopicsService;
  let repository: Repository<ForumTopic>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ForumTopicsService,
        {
          provide: getRepositoryToken(ForumTopic),
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

    service = module.get<ForumTopicsService>(ForumTopicsService);
    repository = module.get<Repository<ForumTopic>>(getRepositoryToken(ForumTopic));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

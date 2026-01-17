import { Test, TestingModule } from '@nestjs/testing';
import { ForumTopicsController } from './forum_topics.controller';
import { ForumTopicsService } from './forum_topics.service';
import { Repository } from 'typeorm';
import { ForumTopic } from './entities/forum_topic.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('ForumTopicsController', () => {
  let controller: ForumTopicsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ForumTopicsController],
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

    controller = module.get<ForumTopicsController>(ForumTopicsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

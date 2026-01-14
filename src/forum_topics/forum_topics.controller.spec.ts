import { Test, TestingModule } from '@nestjs/testing';
import { ForumTopicsController } from './forum_topics.controller';
import { ForumTopicsService } from './forum_topics.service';

describe('ForumTopicsController', () => {
  let controller: ForumTopicsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ForumTopicsController],
      providers: [ForumTopicsService],
    }).compile();

    controller = module.get<ForumTopicsController>(ForumTopicsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { ForumTopicsService } from './forum_topics.service';

describe('ForumTopicsService', () => {
  let service: ForumTopicsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ForumTopicsService],
    }).compile();

    service = module.get<ForumTopicsService>(ForumTopicsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

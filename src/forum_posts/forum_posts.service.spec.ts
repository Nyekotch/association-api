import { Test, TestingModule } from '@nestjs/testing';
import { ForumPostsService } from './forum_posts.service';
import { Repository } from 'typeorm';
import { ForumPost } from './entities/forum_post.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('ForumPostsService', () => {
  let service: ForumPostsService;
  let repository: Repository<ForumPost>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ForumPostsService,
        {
          provide: getRepositoryToken(ForumPost),
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

    service = module.get<ForumPostsService>(ForumPostsService);
    repository = module.get<Repository<ForumPost>>(getRepositoryToken(ForumPost));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

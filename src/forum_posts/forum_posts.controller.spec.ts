import { Test, TestingModule } from '@nestjs/testing';
import { ForumPostsController } from './forum_posts.controller';
import { ForumPostsService } from './forum_posts.service';
import { Repository } from 'typeorm';
import { ForumPost } from './entities/forum_post.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('ForumPostsController', () => {
  let controller: ForumPostsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ForumPostsController],
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

    controller = module.get<ForumPostsController>(ForumPostsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

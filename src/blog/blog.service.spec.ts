import { Test, TestingModule } from '@nestjs/testing';
import { BlogService } from './blog.service';
import { Repository } from 'typeorm';
import { Article } from './entities/article.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('BlogService', () => {
  let service: BlogService;
  let repository: Repository<Article>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BlogService,
        {
          provide: getRepositoryToken(Article),
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

    service = module.get<BlogService>(BlogService);
    repository = module.get<Repository<Article>>(getRepositoryToken(Article));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
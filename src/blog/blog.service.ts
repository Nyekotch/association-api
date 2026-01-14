import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Repository } from 'typeorm';
import { Article } from './entities/article.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Article)
    private readonly articlesRepo: Repository<Article>,
  ) {}

  async create(createBlogDto: CreateBlogDto) {
    const article = this.articlesRepo.create(createBlogDto);
    return this.articlesRepo.save(article);
  }

  findAll() {
    return this.articlesRepo.find({ relations: ['author'] });
  }

  findOne(id: string) {
    return this.articlesRepo.findOne({ where: { id }, relations: ['author'] });
  }

  async update(id: string, updateBlogDto: UpdateBlogDto) {
    await this.articlesRepo.update(id, updateBlogDto);
    return this.findOne(id);
  }

  async remove(id: string) {
    await this.articlesRepo.delete(id);
  }
}

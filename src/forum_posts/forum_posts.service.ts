import { Injectable } from '@nestjs/common';
import { CreateForumPostDto } from './dto/create-forum_post.dto';
import { UpdateForumPostDto } from './dto/update-forum_post.dto';
import { Repository } from 'typeorm';
import { ForumPost } from './entities/forum_post.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ForumPostsService {
  constructor(
    @InjectRepository(ForumPost)
    private readonly forumPostsRepo: Repository<ForumPost>,
  ) {}

  async create(createForumPostDto: CreateForumPostDto) {
    const post = this.forumPostsRepo.create(createForumPostDto);
    return this.forumPostsRepo.save(post);
  }

  findAll() {
    return this.forumPostsRepo.find({ relations: ['topic', 'author'] });
  }

  findOne(id: string) {
    return this.forumPostsRepo.findOne({ where: { id }, relations: ['topic', 'author'] });
  }

  async update(id: string, updateForumPostDto: UpdateForumPostDto) {
    await this.forumPostsRepo.update(id, updateForumPostDto);
    return this.findOne(id);
  }

  async remove(id: string) {
    await this.forumPostsRepo.delete(id);
  }
}

import { Injectable } from '@nestjs/common';
import { CreateForumTopicDto } from './dto/create-forum_topic.dto';
import { UpdateForumTopicDto } from './dto/update-forum_topic.dto';
import { Repository } from 'typeorm';
import { ForumTopic } from './entities/forum_topic.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ForumTopicsService {
  constructor(
    @InjectRepository(ForumTopic)
    private readonly forumTopicsRepo: Repository<ForumTopic>,
  ) {}

  async create(createForumTopicDto: CreateForumTopicDto) {
    const topic = this.forumTopicsRepo.create(createForumTopicDto);
    return this.forumTopicsRepo.save(topic);
  }

  findAll() {
    return this.forumTopicsRepo.find({ 
      relations: ['creator', 'posts'],
      order: { createdat: 'DESC' }
    });
  }

  findOne(id: string) {
    return this.forumTopicsRepo.findOne({ where: { id }, relations: ['creator'] });
  }

  async update(id: string, updateForumTopicDto: UpdateForumTopicDto) {
    await this.forumTopicsRepo.update(id, updateForumTopicDto);
    return this.findOne(id);
  }

  async remove(id: string) {
    await this.forumTopicsRepo.delete(id);
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ForumTopicsService } from './forum_topics.service';
import { CreateForumTopicDto } from './dto/create-forum_topic.dto';
import { UpdateForumTopicDto } from './dto/update-forum_topic.dto';

@Controller('forum-topics')
export class ForumTopicsController {
  constructor(private readonly forumTopicsService: ForumTopicsService) {}

  @Post()
  create(@Body() createForumTopicDto: CreateForumTopicDto) {
    return this.forumTopicsService.create(createForumTopicDto);
  }

  @Get()
  findAll() {
    return this.forumTopicsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.forumTopicsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateForumTopicDto: UpdateForumTopicDto) {
    return this.forumTopicsService.update(id, updateForumTopicDto);
  }

  @Patch(':id/views')
  incrementViews(@Param('id') id: string) {
    return this.forumTopicsService.incrementViews(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.forumTopicsService.remove(id);
  }
}

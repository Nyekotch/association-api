import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ForumTopicsService } from './forum_topics.service';
import { CreateForumTopicDto } from './dto/create-forum_topic.dto';
import { UpdateForumTopicDto } from './dto/update-forum_topic.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

@Controller('forum-topics')
export class ForumTopicsController {
  constructor(private readonly forumTopicsService: ForumTopicsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MODERATOR)
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
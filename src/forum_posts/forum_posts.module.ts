import { Module } from '@nestjs/common';
import { ForumPostsService } from './forum_posts.service';
import { ForumPostsController } from './forum_posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ForumPost } from './entities/forum_post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ForumPost])],
  controllers: [ForumPostsController],
  providers: [ForumPostsService],
})
export class ForumPostsModule {}

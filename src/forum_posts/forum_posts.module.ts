import { Module } from '@nestjs/common';
import { ForumPostsService } from './forum_posts.service';
import { ForumPostsController } from './forum_posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ForumPost } from './entities/forum_post.entity';
import { PostOwnerGuard } from './guards/post-owner.guard';

@Module({
  imports: [TypeOrmModule.forFeature([ForumPost])],
  controllers: [ForumPostsController],
  providers: [ForumPostsService, PostOwnerGuard],
})
export class ForumPostsModule {}

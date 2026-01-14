import { Module } from '@nestjs/common';
import { ForumTopicsService } from './forum_topics.service';
import { ForumTopicsController } from './forum_topics.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ForumTopic } from './entities/forum_topic.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ForumTopic])],
  controllers: [ForumTopicsController],
  providers: [ForumTopicsService],
})
export class ForumTopicsModule {}

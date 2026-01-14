import { PartialType } from '@nestjs/mapped-types';
import { CreateForumTopicDto } from './create-forum_topic.dto';

export class UpdateForumTopicDto extends PartialType(CreateForumTopicDto) {}

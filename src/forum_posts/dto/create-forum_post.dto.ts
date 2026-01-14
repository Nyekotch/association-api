import { IsString, IsUUID, IsNumber, IsOptional } from 'class-validator';

export class CreateForumPostDto {
  @IsUUID()
  topicid: string;

  @IsUUID()
  authorid: string;

  @IsString()
  content: string;

  @IsOptional()
  @IsNumber()
  likescount?: number;
}

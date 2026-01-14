import { IsString, IsOptional, IsUUID, IsBoolean, IsNumber } from 'class-validator';

export class CreateForumTopicDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsUUID()
  creatorid: string;

  @IsOptional()
  @IsBoolean()
  ispinned?: boolean;

  @IsOptional()
  @IsBoolean()
  isclosed?: boolean;

  @IsOptional()
  @IsNumber()
  viewcount?: number;
}

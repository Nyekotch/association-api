import { IsString, IsOptional, IsUUID, IsBoolean, IsNumber, IsDateString } from 'class-validator';

export class CreateBlogDto {
  @IsString()
  title: string;

  @IsString()
  slug: string;

  @IsString()
  content: string;

  @IsOptional()
  @IsString()
  excerpt?: string;

  @IsOptional()
  @IsString()
  featuredimage?: string;

  @IsOptional()
  @IsUUID()
  authorid?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsBoolean()
  ispublished?: boolean;

  @IsOptional()
  @IsNumber()
  viewcount?: number;
}

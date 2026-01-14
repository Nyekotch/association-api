import { IsString, IsOptional, IsUUID, IsBoolean, IsNumber, IsDateString } from 'class-validator';

export class CreateEventDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsDateString()
  startdate: string;

  @IsDateString()
  enddate: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsNumber()
  capacity?: number;

  @IsOptional()
  @IsString()
  imageurl?: string;

  @IsUUID()
  organizerid: string;

  @IsOptional()
  @IsBoolean()
  ispublished?: boolean;
}

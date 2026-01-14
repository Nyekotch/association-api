import { IsUUID, IsEnum, IsOptional } from 'class-validator';
import { RegistrationStatus } from '../entities/event_registration.entity';

export class CreateEventRegistrationDto {
  @IsUUID()
  eventid: string;

  @IsUUID()
  memberid: string;

  @IsOptional()
  @IsEnum(RegistrationStatus)
  status?: RegistrationStatus;
}

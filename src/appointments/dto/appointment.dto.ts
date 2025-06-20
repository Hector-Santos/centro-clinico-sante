import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { IsFutureDate } from 'src/common/validators/is-future-date.validator';

export enum AppointmentStatus {
  Pending = 'pending',
  Confirmed = 'confirmed',
  Cancelled = 'cancelled',
  Completed = 'completed',
  Absence = 'absence',
}

export class AppointmentDto {
  @IsString()
  id: string;

  @IsString()
  doctorId: string;

  @IsString()
  patientId: string;

  @IsFutureDate()
  @Type(() => Date)
  datetime: Date;

  @IsEnum(AppointmentStatus)
  status: AppointmentStatus;

  @IsNumber()
  price: number;
}

export class CreateAppointmentDto {
  @IsString()
  doctorId: string;

  @IsString()
  patientId: string;

  @IsFutureDate()
  @Type(() => Date)
  datetime: Date;

  @IsEnum(AppointmentStatus)
  status: AppointmentStatus;

  @IsNumber()
  price: number;
}

export class UpdateAppointmentDto {
  @IsString()
  doctorId: string;

  @IsString()
  patientId: string;

  @IsFutureDate()
  @Type(() => Date)
  datetime: Date;

  @IsEnum(AppointmentStatus)
  status: AppointmentStatus;

  @IsNumber()
  price: number;
}

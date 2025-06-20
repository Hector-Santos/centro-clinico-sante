// ✅ Decorators
import {
  IsString,
  IsOptional,
  IsDate,
  IsEnum,
  IsNumber,
  ValidateNested,
  IsInt,
  Min,
  IsNotEmpty,
  IsArray,
  Matches,
} from 'class-validator';
import { Type } from 'class-transformer';

// ✅ Custom validator
import { IsHour } from './../decorators/is-hour.decorator';
import { IsFutureDate } from '../../common/validators/is-future-date.validator';
import { InvoiceMonthPattern } from '../references/regex-reference';

// ✅ Enums
export enum AppointmentStatus {
  Pending = 'pending',
  Confirmed = 'confirmed',
  Cancelled = 'cancelled',
  Completed = 'completed',
  Absence = 'absence',
}

export enum InvoiceStatus {
  Pending = 'pending',
  Paid = 'paid',
  Overdue = 'overdue',
}

// ✅ DTOs

export class WeeklyScheduleDto {
  @IsHour({ each: true })
  monday: string[];

  @IsHour({ each: true })
  tuesday: string[];

  @IsHour({ each: true })
  wednesday: string[];

  @IsHour({ each: true })
  thursday: string[];

  @IsHour({ each: true })
  friday: string[];

  @IsHour({ each: true })
  saturday: string[];

  @IsHour({ each: true })
  sunday: string[];
}

export class ScheduleDto {
  @IsString()
  doctorId: string;

  @ValidateNested()
  @Type(() => WeeklyScheduleDto)
  weeklySchedule: WeeklyScheduleDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ScheduleExceptionDto)
  exceptions: ScheduleExceptionDto[];
}

export class ScheduleExceptionDto {
  @IsString()
  id: string;

  @Type(() => Date)
  @IsFutureDate()
  originalDate: Date;

  @IsOptional()
  @Type(() => Date)
  @IsFutureDate()
  newDate?: Date;

  @IsOptional()
  @IsNotEmpty()
  @IsHour({ each: true })
  newTimes?: string[];

  @IsOptional()
  @IsInt()
  @Min(1)
  durationInWeeks?: number;
}

export class PatientDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsString()
  phone: string;

  @IsString()
  doctorId: string;
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

export class InvoiceDto {
  @IsString()
  id: string;

  @IsString()
  patientId: string;

  @Matches(InvoiceMonthPattern)
  referenceMonth: string;

  @IsEnum(InvoiceStatus)
  status: InvoiceStatus;

  @IsDate()
  @Type(() => Date)
  createdAt: Date;

  @IsDate()
  @Type(() => Date)
  dueDate: Date;

  @IsString()
  txid: string;

  @IsString()
  qrCode: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  paidAt: Date | null;
}

import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { OmitType, PartialType } from '@nestjs/mapped-types';
import { IsDifferentDay } from '../../common/decorators/day-change.decorator';
import {
  BookedDto,
  DayAvailabilityDto,
  SlotDto,
} from '../../schedule/dto/schedule.dto';

export enum ScheduleExceptionType {
  CancelWeekDay = 'cancelWeekDay',
  AddWeekDay = 'addWeekDay',
  ReplaceWeekDay = 'replaceWeekDay',
  CancelAvailability = 'cancelAvailability',
  AddAvailability = 'addAvailability',
  ReplaceAvailability = 'replaceAvailability',
  ReplaceDayAndTime = 'replaceDayAndTime',
  CancelBooking = 'cancelBooking',
  AddBooking = 'addBooking',
  ReplaceBooking = 'replaceBooking',
}

export class ScheduleExceptionDto {
  @IsString()
  id: string;

  @IsString()
  doctorId: string;

  @IsDate()
  @Type(() => Date)
  startDate: Date;

  @IsOptional()
  @IsInt()
  @Min(1)
  durationInWeeks: number;

  @IsEnum(ScheduleExceptionType)
  type: ScheduleExceptionType;
}

export class WeekDayExceptionDto extends ScheduleExceptionDto {
  @IsInt()
  @Min(0)
  @Max(6)
  weekDay: number;
}

export class ReplaceWeekDayDto extends ScheduleExceptionDto {
  @IsInt()
  @Min(0)
  @Max(6)
  oldWeekDay: number;

  @IsInt()
  @Min(0)
  @Max(6)
  @IsDifferentDay()
  newWeekDay: number;
}

export class ReplaceDayTimeDto extends ScheduleExceptionDto {
  @IsInt()
  @Min(0)
  @Max(6)
  oldWeekDay: number;

  @ValidateNested()
  @Type(() => DayAvailabilityDto)
  newAvailability: DayAvailabilityDto;
}

export class AvailabilityExceptionDto extends ScheduleExceptionDto {
  @ValidateNested()
  @Type(() => DayAvailabilityDto)
  availability: DayAvailabilityDto;
}

export class BookingExceptionDto extends ScheduleExceptionDto {
  @ValidateNested()
  @Type(() => BookedDto)
  booking: BookedDto;
}

export class ReplaceBookingDto extends ScheduleExceptionDto {
  @ValidateNested()
  @Type(() => BookedDto)
  booked: BookedDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SlotDto)
  newBookings: SlotDto[];
}

export class CreateScheduleExceptionDto extends OmitType(ScheduleExceptionDto, [
  'id',
]) {}

export class UpdateScheduleExceptionDto extends PartialType(
  CreateScheduleExceptionDto,
) {}

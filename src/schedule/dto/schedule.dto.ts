import { OmitType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  IsArray,
  IsDate,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
  Validate,
  ValidateNested,
} from 'class-validator';
import { HasDistinctIndex } from 'src/common/decorators/has-distinct-index.decorator';
import { IsHour } from 'src/common/decorators/is-hour.decorator';
import { ScheduleExceptionConsistency } from 'src/common/validators/schedule-exception.validator';

export class BookedDto {
  @IsString()
  patientId: string;

  @IsInt()
  @Min(0)
  @Max(6)
  weekday: number;

  @IsHour()
  hour: string;
}

export class HourRangeDto {
  @IsHour()
  start: string;

  @IsHour()
  end: string;
}

export class DayAvailabilityDto {
  @IsInt()
  @Min(0)
  @Max(6)
  weekdayIndex: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => HourRangeDto)
  intervals: HourRangeDto[];
}

export class ScheduleExceptionDto {
  @IsString()
  id: string;

  @IsOptional()
  @IsString()
  patientId?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => BookedDto)
  originalBooking?: BookedDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => BookedDto)
  newBooking?: BookedDto;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DayAvailabilityDto)
  originalDays?: DayAvailabilityDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DayAvailabilityDto)
  NewDays?: DayAvailabilityDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => HourRangeDto)
  originalHours?: HourRangeDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => HourRangeDto)
  newHours?: HourRangeDto[];

  @IsDate()
  @Type(() => Date)
  createdAt: Date;

  @IsOptional()
  @IsInt()
  @Min(1)
  durationInWeeks: number;
}

export class ScheduleDto {
  @IsString()
  doctorId: string;

  @IsArray()
  @ArrayMaxSize(6)
  @HasDistinctIndex()
  @ValidateNested({ each: true })
  @Type(() => DayAvailabilityDto)
  weeklyAvailability: DayAvailabilityDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BookedDto)
  booked: BookedDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Validate(ScheduleExceptionConsistency)
  @Type(() => ScheduleExceptionDto)
  exceptions?: ScheduleExceptionDto[];
}

export class CreateScheduleExceptionDto extends OmitType(ScheduleExceptionDto, [
  'id',
]) {}

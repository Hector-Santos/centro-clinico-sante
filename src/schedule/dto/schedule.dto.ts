import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsString,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { IsHour } from '../../common/decorators/is-hour.decorator';

export class SlotDto {
  @IsInt()
  @Min(0)
  @Max(6)
  weekday: number;

  @IsHour()
  hour: string;
}

export class BookedDto {
  @IsString()
  patientId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SlotDto)
  patientBookings: SlotDto[];
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

export class ScheduleDto {
  @IsString()
  doctorId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DayAvailabilityDto)
  weeklyAvailability: DayAvailabilityDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BookedDto)
  booked?: BookedDto[];
}

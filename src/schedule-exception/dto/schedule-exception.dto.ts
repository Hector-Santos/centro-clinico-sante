import { Type } from 'class-transformer';
import { IsFutureDate } from 'src/common/validators/is-future-date.validator';
import { IsHour } from 'src/common/decorators/is-hour.decorator';
import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

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

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  doctorId?: string;
}

export class CreateScheduleExceptionDto {
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

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  doctorId?: string;
}

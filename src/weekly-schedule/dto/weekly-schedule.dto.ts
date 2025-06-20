import { IsString } from 'class-validator';
import { IsHour } from 'src/common/decorators/is-hour.decorator';

export class WeeklyScheduleDto {
  @IsString()
  id: string;

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

  @IsString()
  doctorId: string;
}

import { PipeTransform } from '@nestjs/common';
import { ScheduleExceptionDto } from '../../schedule/dto/schedule.dto';
export declare class ScheduleExceptionValidationPipe implements PipeTransform {
    transform(value: any): ScheduleExceptionDto;
}

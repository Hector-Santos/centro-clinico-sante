import { ScheduleExceptionDto } from '../../schedule/dto/schedule.dto';
import { BookedDto, DayAvailabilityDto, HourRangeDto } from '../../schedule/dto/schedule.dto';
export type ExceptionType = 'booked' | 'day' | 'hour';
export interface TypedScheduleException {
    type: ExceptionType;
    original: BookedDto | DayAvailabilityDto[] | HourRangeDto[];
    updated: BookedDto | DayAvailabilityDto[] | HourRangeDto[] | null;
    full: ScheduleExceptionDto;
}
export declare class ExceptionCacheHelper {
    static getStructuredSortedExceptions(doctorId: string, direction?: 'asc' | 'desc'): Promise<TypedScheduleException[]>;
}

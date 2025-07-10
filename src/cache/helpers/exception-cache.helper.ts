import { db } from '../../../firebase.admin';
import { ScheduleExceptionDto } from '../../schedule/dto/schedule.dto';
import {
  BookedDto,
  DayAvailabilityDto,
  HourRangeDto,
} from '../../schedule/dto/schedule.dto';

export type ExceptionType = 'booked' | 'day' | 'hour';

export interface TypedScheduleException {
  type: ExceptionType;
  original: BookedDto | DayAvailabilityDto[] | HourRangeDto[];
  updated: BookedDto | DayAvailabilityDto[] | HourRangeDto[] | null;
  full: ScheduleExceptionDto;
}

export class ExceptionCacheHelper {
  static async getStructuredSortedExceptions(
    doctorId: string,
    direction: 'asc' | 'desc' = 'desc',
  ): Promise<TypedScheduleException[]> {
    const ref = db
      .collection('cache')
      .doc(`${doctorId}`)
      .collection('exceptions');

    const snapshot = await ref.get();

    const exceptions = snapshot.docs.map((doc) => {
      const data = doc.data() as ScheduleExceptionDto;
      data.createdAt = new Date(data.createdAt);
      return data;
    });

    const sortFn = (a: ScheduleExceptionDto, b: ScheduleExceptionDto) =>
      direction === 'asc'
        ? a.createdAt.getTime() - b.createdAt.getTime()
        : b.createdAt.getTime() - a.createdAt.getTime();

    const mapped: TypedScheduleException[] = exceptions.map((ex) => {
      if (ex.patientId && ex.originalBooking) {
        return {
          type: 'booked',
          original: ex.originalBooking,
          updated: ex.newBooking || null,
          full: ex,
        };
      } else if (ex.originalDays?.length) {
        return {
          type: 'day',
          original: ex.originalDays,
          updated: ex.NewDays || null,
          full: ex,
        };
      } else if (ex.originalHours?.length) {
        return {
          type: 'hour',
          original: ex.originalHours,
          updated: ex.newHours || null,
          full: ex,
        };
      } else {
        throw new Error(`Unrecognized exception format for ID: ${ex.id}`);
      }
    });

    const byType: Record<ExceptionType, TypedScheduleException[]> = {
      booked: [],
      day: [],
      hour: [],
    };

    for (const item of mapped) {
      byType[item.type].push(item);
    }

    Object.values(byType).forEach((group) =>
      group.sort((a, b) => sortFn(a.full, b.full)),
    );

    return [...byType.booked, ...byType.day, ...byType.hour];
  }
}

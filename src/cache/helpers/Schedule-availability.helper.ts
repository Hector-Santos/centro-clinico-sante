import { getDay } from 'date-fns';
import { db } from '../../../firebase.admin';
import { DayAvailabilityDto } from '../../schedule/dto/schedule.dto';
import { ScheduleDto } from '../../schedule/dto/schedule.dto';

export class ScheduleAvailabilityHelper {
  static async getWeeklyAvailability(
    doctorId: string,
    targetDays?: number[],
  ): Promise<DayAvailabilityDto[]> {
    const scheduleRef = db.collection('schedules').doc(doctorId);
    const scheduleSnap = await scheduleRef.get();

    if (!scheduleSnap.exists) throw new Error('Schedule not found');

    const schedule = scheduleSnap.data() as ScheduleDto;
    let weekly = schedule.weeklyAvailability || [];

    if (targetDays?.length) {
      const targetSet = new Set(targetDays);
      weekly = weekly.filter((day) => targetSet.has(day.weekdayIndex));
    }

    const exceptions = schedule.exceptions || [];
    const bookedEntries = schedule.booked || [];

    const excludedDays = new Set<number>();
    const blockedTimeMap = new Map<number, Set<string>>();

    for (const exception of exceptions) {
      exception.originalDays?.forEach((day) =>
        excludedDays.add(day.weekdayIndex),
      );

      if (
        exception.originalHours?.length &&
        exception.originalDays?.length === 1
      ) {
        const parentDayIndex = exception.originalDays[0].weekdayIndex;

        for (const hourBlock of exception.originalHours) {
          const timeKey = `${hourBlock.start}-${hourBlock.end}`;
          const set = blockedTimeMap.get(parentDayIndex) || new Set();
          set.add(timeKey);
          blockedTimeMap.set(parentDayIndex, set);
        }
      }
    }

    for (const booking of bookedEntries) {
      for (const slot of booking.patientBookings) {
        const blockedHours = blockedTimeMap.get(slot.weekday) || new Set();
        blockedHours.add(slot.hour);
        blockedTimeMap.set(slot.weekday, blockedHours);
      }
    }

    const available = weekly
      .filter((day) => !excludedDays.has(day.weekdayIndex))
      .map((day) => {
        const blocked = blockedTimeMap.get(day.weekdayIndex);
        if (!blocked) return day;

        const filteredIntervals = day.intervals.filter((interval) => {
          const fullRangeKey = `${interval.start}-${interval.end}`;
          return !blocked.has(fullRangeKey) && !blocked.has(interval.start);
        });

        return { ...day, intervals: filteredIntervals };
      });

    return available;
  }

  static async getTodayAvailability(
    doctorId: string,
  ): Promise<DayAvailabilityDto[]> {
    const today = getDay(new Date());
    return this.getWeeklyAvailability(doctorId, [today]);
  }

  static async getSelectedDaysAvailability(
    doctorId: string,
    days: number[],
  ): Promise<DayAvailabilityDto[]> {
    return this.getWeeklyAvailability(doctorId, days);
  }

  static async getFullWeekAvailability(
    doctorId: string,
  ): Promise<DayAvailabilityDto[]> {
    return this.getWeeklyAvailability(doctorId);
  }
}

import { DayAvailabilityDto } from '../../schedule/dto/weekly-schedule.dto';
export declare class ScheduleAvailabilityHelper {
    static getWeeklyAvailability(doctorId: string, targetDays?: number[]): Promise<DayAvailabilityDto[]>;
    static getTodayAvailability(doctorId: string): Promise<DayAvailabilityDto[]>;
    static getSelectedDaysAvailability(doctorId: string, days: number[]): Promise<DayAvailabilityDto[]>;
    static getFullWeekAvailability(doctorId: string): Promise<DayAvailabilityDto[]>;
}

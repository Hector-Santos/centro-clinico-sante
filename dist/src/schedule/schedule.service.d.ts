import { BookedDto, DayAvailabilityDto, ScheduleDto, ScheduleExceptionDto, UpdateScheduleExceptionDto } from './dto/schedule.dto';
export declare class ScheduleService {
    private collection;
    getScheduleByDoctorId(doctorId: string): Promise<ScheduleDto>;
    getWeeklyAvailability(doctorId: string): Promise<DayAvailabilityDto[]>;
    getDayAvailability(doctorId: string, dayIndex: number): Promise<DayAvailabilityDto>;
    getBooked(doctorId: string): Promise<BookedDto[]>;
    getBookedForPatient(doctorId: string, patientId: string): Promise<BookedDto>;
    getExceptions(doctorId: string): Promise<ScheduleExceptionDto[]>;
    getExceptionById(doctorId: string, exceptionId: string): Promise<ScheduleExceptionDto>;
    createSchedule(data: ScheduleDto): Promise<void>;
    createBooked(doctorId: string, booked: BookedDto): Promise<void>;
    createException(doctorId: string, exception: ScheduleExceptionDto): Promise<void>;
    updateSchedule(doctorId: string, data: Partial<ScheduleDto>): Promise<void>;
    updateWeekly(doctorId: string, weekly: DayAvailabilityDto[]): Promise<void>;
    updateDay(doctorId: string, dayIndex: number, day: DayAvailabilityDto): Promise<void>;
    updateBooked(doctorId: string, updatedBooked: BookedDto): Promise<void>;
    deleteSchedule(doctorId: string): Promise<void>;
    deleteBooked(doctorId: string, patientId: string): Promise<void>;
    deleteException(doctorId: string, exceptionId: string): Promise<void>;
    deleteExceptionsByPatient(doctorId: string, patientId: string): Promise<void>;
    deleteExpiredExceptions(doctorId: string, now: Date): Promise<void>;
    deleteExceptionByContent(doctorId: string, data: UpdateScheduleExceptionDto): Promise<void>;
}

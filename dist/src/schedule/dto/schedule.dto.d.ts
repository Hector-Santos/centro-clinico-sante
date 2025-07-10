export declare class SlotDto {
    weekday: number;
    hour: string;
}
export declare class BookedDto {
    patientId: string;
    patientBookings: SlotDto[];
}
export declare class HourRangeDto {
    start: string;
    end: string;
}
export declare class DayAvailabilityDto {
    weekdayIndex: number;
    intervals: HourRangeDto[];
}
export declare class ScheduleExceptionDto {
    id: string;
    patientId?: string;
    originalBooking?: BookedDto;
    newBooking?: BookedDto;
    originalDays?: DayAvailabilityDto[];
    NewDays?: DayAvailabilityDto[];
    originalHours?: HourRangeDto[];
    newHours?: HourRangeDto[];
    createdAt: Date;
    durationInWeeks: number;
}
export declare class ScheduleDto {
    doctorId: string;
    weeklyAvailability: DayAvailabilityDto[];
    booked: BookedDto[];
    exceptions?: ScheduleExceptionDto[];
}
declare const CreateScheduleExceptionDto_base: import("@nestjs/mapped-types").MappedType<Omit<ScheduleExceptionDto, "id">>;
export declare class CreateScheduleExceptionDto extends CreateScheduleExceptionDto_base {
}
declare const UpdateScheduleExceptionDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateScheduleExceptionDto>>;
export declare class UpdateScheduleExceptionDto extends UpdateScheduleExceptionDto_base {
}
export {};

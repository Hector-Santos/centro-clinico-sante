export declare class ScheduleExceptionDto {
    id: string;
    originalDate: Date;
    newDate?: Date;
    newTimes?: string[];
    durationInWeeks?: number;
    doctorId?: string;
}
export declare class CreateScheduleExceptionDto {
    originalDate: Date;
    newDate?: Date;
    newTimes?: string[];
    durationInWeeks?: number;
    doctorId?: string;
}

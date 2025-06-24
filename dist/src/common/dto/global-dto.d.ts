export declare enum AppointmentStatus {
    Pending = "pending",
    Confirmed = "confirmed",
    Cancelled = "cancelled",
    Completed = "completed",
    Absence = "absence"
}
export declare enum InvoiceStatus {
    Pending = "pending",
    Paid = "paid",
    Overdue = "overdue"
}
export declare class WeeklyScheduleDto {
    monday: string[];
    tuesday: string[];
    wednesday: string[];
    thursday: string[];
    friday: string[];
    saturday: string[];
    sunday: string[];
}
export declare class ScheduleDto {
    doctorId: string;
    weeklySchedule: WeeklyScheduleDto;
    exceptions: ScheduleExceptionDto[];
}
export declare class ScheduleExceptionDto {
    id: string;
    originalDate: Date;
    newDate?: Date;
    newTimes?: string[];
    durationInWeeks?: number;
}
export declare class PatientDto {
    id: string;
    name: string;
    phone: string;
    doctorId: string;
}
export declare class AppointmentDto {
    id: string;
    doctorId: string;
    patientId: string;
    datetime: Date;
    status: AppointmentStatus;
    price: number;
}
export declare class InvoiceDto {
    id: string;
    patientId: string;
    referenceMonth: string;
    status: InvoiceStatus;
    createdAt: Date;
    dueDate: Date;
    txid: string;
    qrCode: string;
    paidAt: Date | null;
}

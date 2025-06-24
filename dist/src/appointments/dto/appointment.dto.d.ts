export declare enum AppointmentStatus {
    Pending = "pending",
    Confirmed = "confirmed",
    Cancelled = "cancelled",
    Completed = "completed",
    Absence = "absence"
}
export declare class AppointmentDto {
    id: string;
    doctorId: string;
    patientId: string;
    datetime: Date;
    status: AppointmentStatus;
    price: number;
}
export declare class CreateAppointmentDto {
    doctorId: string;
    patientId: string;
    datetime: Date;
    status: AppointmentStatus;
    price: number;
}
export declare class UpdateAppointmentDto {
    doctorId: string;
    patientId: string;
    datetime: Date;
    status: AppointmentStatus;
    price: number;
}

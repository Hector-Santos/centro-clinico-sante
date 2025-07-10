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
declare const CreateAppointmentDto_base: import("@nestjs/mapped-types").MappedType<Omit<AppointmentDto, "id">>;
export declare class CreateAppointmentDto extends CreateAppointmentDto_base {
}
declare const UpdateAppointmentDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateAppointmentDto>>;
export declare class UpdateAppointmentDto extends UpdateAppointmentDto_base {
}
export {};

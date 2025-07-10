import { AppointmentDto, CreateAppointmentDto, UpdateAppointmentDto } from './dto/appointment.dto';
export declare class AppointmentService {
    private db;
    private collection;
    constructor();
    create(appointment: CreateAppointmentDto): Promise<AppointmentDto>;
    findAll(): Promise<AppointmentDto[]>;
    findOne(id: string): Promise<AppointmentDto>;
    update(id: string, appointment: UpdateAppointmentDto): Promise<void>;
    delete(id: string): Promise<void>;
}

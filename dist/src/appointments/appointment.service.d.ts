import { AppointmentDto, CreateAppointmentDto, UpdateAppointmentDto } from './dto/appointment.dto';
export declare class AppointmentService {
    private db;
    private collection;
    constructor();
    create(dto: CreateAppointmentDto): Promise<AppointmentDto>;
    findAll(): Promise<AppointmentDto[]>;
    findOne(id: string): Promise<AppointmentDto | null>;
    update(id: string, dto: UpdateAppointmentDto): Promise<AppointmentDto>;
    remove(id: string): Promise<{
        id: string;
    }>;
}

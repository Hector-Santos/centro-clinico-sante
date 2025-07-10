import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto, UpdateAppointmentDto } from './dto/appointment.dto';
export declare class AppointmentController {
    private readonly appointmentService;
    constructor(appointmentService: AppointmentService);
    create(appointment: CreateAppointmentDto): Promise<import("./dto/appointment.dto").AppointmentDto>;
    findAll(): Promise<import("./dto/appointment.dto").AppointmentDto[]>;
    findOne(id: string): Promise<import("./dto/appointment.dto").AppointmentDto>;
    update(id: string, appointment: UpdateAppointmentDto): Promise<void>;
    delete(id: string): Promise<void>;
}

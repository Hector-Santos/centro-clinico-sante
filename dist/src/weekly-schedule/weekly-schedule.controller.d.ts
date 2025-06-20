import { WeeklyScheduleDto } from './dto/weekly-schedule.dto';
import { WeeklyScheduleService } from './weekly-schedule.service';
export declare class WeeklyScheduleController {
    private readonly service;
    constructor(service: WeeklyScheduleService);
    create(dto: WeeklyScheduleDto): Promise<any>;
    findAll(): Promise<any[]>;
    findOne(id: string): Promise<any>;
    update(id: string, dto: Partial<WeeklyScheduleDto>): Promise<any>;
    delete(id: string): Promise<void>;
}

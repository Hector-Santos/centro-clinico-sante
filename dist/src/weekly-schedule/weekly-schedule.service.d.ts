import { WeeklyScheduleDto } from './dto/weekly-schedule.dto';
export declare class WeeklyScheduleService {
    private collection;
    create(dto: WeeklyScheduleDto): Promise<any>;
    findAll(): Promise<any[]>;
    findOne(id: string): Promise<any | null>;
    update(id: string, dto: Partial<WeeklyScheduleDto>): Promise<any>;
    delete(id: string): Promise<void>;
}

import { ScheduleExceptionDto } from './dto/schedule-exception.dto';
export declare class ScheduleExceptionService {
    private collection;
    create(dto: ScheduleExceptionDto): Promise<any>;
    findAll(): Promise<any[]>;
    findOne(id: string): Promise<any | null>;
    update(id: string, dto: Partial<ScheduleExceptionDto>): Promise<any>;
    delete(id: string): Promise<void>;
}

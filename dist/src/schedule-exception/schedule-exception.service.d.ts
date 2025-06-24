import { CreateScheduleExceptionDto, ScheduleExceptionDto } from './dto/schedule-exception.dto';
export declare class ScheduleExceptionService {
    private collection;
    create(dto: CreateScheduleExceptionDto): Promise<ScheduleExceptionDto>;
    findAll(): Promise<any[]>;
    findOne(id: string): Promise<any | null>;
    update(id: string, dto: Partial<ScheduleExceptionDto>): Promise<any>;
    delete(id: string): Promise<void>;
}

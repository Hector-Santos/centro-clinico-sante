import { CreateScheduleExceptionDto, ScheduleExceptionDto } from './dto/schedule-exception.dto';
import { ScheduleExceptionService } from './schedule-exception.service';
export declare class ScheduleExceptionController {
    private readonly service;
    constructor(service: ScheduleExceptionService);
    create(dto: CreateScheduleExceptionDto): Promise<ScheduleExceptionDto>;
    findAll(): Promise<any[]>;
    findOne(id: string): Promise<any>;
    update(id: string, dto: Partial<ScheduleExceptionDto>): Promise<any>;
    delete(id: string): Promise<void>;
}

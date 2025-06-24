import { InvoiceService } from './invoice.service';
import { InvoiceDto } from './dto/invoice.dto';
export declare class InvoiceController {
    private readonly service;
    constructor(service: InvoiceService);
    create(dto: InvoiceDto): Promise<InvoiceDto>;
    findAll(): Promise<InvoiceDto[]>;
    findOne(id: string): Promise<InvoiceDto>;
    update(id: string, dto: Partial<InvoiceDto>): Promise<InvoiceDto>;
    delete(id: string): Promise<void>;
}

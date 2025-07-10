import { InvoiceDto, UpdateInvoiceDto } from './dto/invoice.dto';
import { InvoiceService } from './invoice.service';
export declare class InvoiceController {
    private readonly service;
    constructor(service: InvoiceService);
    create(dto: InvoiceDto): Promise<InvoiceDto>;
    findAll(): Promise<InvoiceDto[]>;
    findOne(id: string): Promise<InvoiceDto>;
    update(id: string, dto: UpdateInvoiceDto): Promise<{
        message: string;
    }>;
    delete(id: string): Promise<void>;
}

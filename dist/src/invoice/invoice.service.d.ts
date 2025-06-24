import { InvoiceDto } from '../invoice/dto/invoice.dto';
export declare class InvoiceService {
    private collection;
    create(dto: InvoiceDto): Promise<InvoiceDto>;
    findAll(): Promise<InvoiceDto[]>;
    findOne(id: string): Promise<InvoiceDto | null>;
    update(id: string, dto: Partial<InvoiceDto>): Promise<InvoiceDto>;
    delete(id: string): Promise<void>;
}

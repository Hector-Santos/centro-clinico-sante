export declare enum InvoiceStatus {
    Pending = "pending",
    Paid = "paid",
    Overdue = "overdue"
}
export declare class InvoiceDto {
    id: string;
    patientId: string;
    referenceMonth: string;
    status: InvoiceStatus;
    createdAt: Date;
    dueDate: Date;
    txid: string;
    qrCode: string;
    paidAt: Date | null;
}
declare const CreateInvoiceDto_base: import("@nestjs/mapped-types").MappedType<Omit<InvoiceDto, "id">>;
export declare class CreateInvoiceDto extends CreateInvoiceDto_base {
}
declare const UpdateInvoiceDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateInvoiceDto>>;
export declare class UpdateInvoiceDto extends UpdateInvoiceDto_base {
}
export {};

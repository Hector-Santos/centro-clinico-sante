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

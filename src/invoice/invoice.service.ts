import { Injectable } from '@nestjs/common';
import { db } from 'firebase.admin';
import { InvoiceDto } from './dto/invoice.dto';

@Injectable()
export class InvoiceService {
  private collection = db.collection('invoices');

  async create(dto: InvoiceDto): Promise<InvoiceDto> {
    const docRef = this.collection.doc();
    const id = docRef.id;
    const data: InvoiceDto = { id, ...dto };
    await docRef.set(data);
    return data;
  }

  async findAll(): Promise<InvoiceDto[]> {
    const snapshot = await this.collection.get();
    return snapshot.docs.map((doc) => doc.data() as InvoiceDto);
  }

  async findOne(id: string): Promise<InvoiceDto | null> {
    const doc = await this.collection.doc(id).get();
    return doc.exists ? (doc.data() as InvoiceDto) : null;
  }

  async update(id: string, dto: Partial<InvoiceDto>): Promise<InvoiceDto> {
    const cleanData = Object.fromEntries(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      Object.entries(dto).filter(([_, v]) => v !== undefined),
    );
    await this.collection.doc(id).update(cleanData);
    const updated = await this.collection.doc(id).get();
    return updated.data() as InvoiceDto;
  }

  async delete(id: string): Promise<void> {
    await this.collection.doc(id).delete();
  }
}

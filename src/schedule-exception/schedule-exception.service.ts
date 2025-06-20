import { Injectable } from '@nestjs/common';
import { db } from 'firebase.admin';
import {
  CreateScheduleExceptionDto,
  ScheduleExceptionDto,
} from './dto/schedule-exception.dto';

@Injectable()
export class ScheduleExceptionService {
  private collection = db.collection('scheduleExceptions');

  async create(dto: CreateScheduleExceptionDto): Promise<ScheduleExceptionDto> {
    const docRef = this.collection.doc();
    const id = docRef.id;
    const data = { id, ...dto };
    await docRef.set(data);
    return data;
  }

  async findAll(): Promise<any[]> {
    const snapshot = await this.collection.get();
    return snapshot.docs.map((doc) => doc.data());
  }

  async findOne(id: string): Promise<any | null> {
    const doc = await this.collection.doc(id).get();
    return doc.exists ? doc.data() : null;
  }

  async update(id: string, dto: Partial<ScheduleExceptionDto>): Promise<any> {
    const cleanData = Object.fromEntries(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      Object.entries(dto).filter(([_, v]) => v !== undefined),
    );
    await this.collection.doc(id).update(cleanData);
    const updated = await this.collection.doc(id).get();
    return updated.data();
  }

  async delete(id: string): Promise<void> {
    await this.collection.doc(id).delete();
  }
}

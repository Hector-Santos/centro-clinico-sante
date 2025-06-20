import { Injectable } from '@nestjs/common';
import { db } from 'firebase.admin';
import { WeeklyScheduleDto } from './dto/weekly-schedule.dto';

@Injectable()
export class WeeklyScheduleService {
  private collection = db.collection('weeklySchedules');

  async create(dto: WeeklyScheduleDto): Promise<any> {
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

  async update(id: string, dto: Partial<WeeklyScheduleDto>): Promise<any> {
    await this.collection.doc(id).update(dto);
    const updated = await this.collection.doc(id).get();
    return updated.data();
  }

  async delete(id: string): Promise<void> {
    await this.collection.doc(id).delete();
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { db } from './../../firebase.admin';
import {
  ScheduleExceptionDto,
  CreateScheduleExceptionDto,
  UpdateScheduleExceptionDto,
  ScheduleExceptionType,
} from './dto/schedule-exception.dto';

@Injectable()
export class ScheduleExceptionService {
  private collection = db.collection('scheduleExceptions');

  async create(
    data: CreateScheduleExceptionDto,
    type: ScheduleExceptionType,
  ): Promise<ScheduleExceptionDto> {
    const docRef = this.collection.doc();
    const payload: ScheduleExceptionDto = {
      doctorId: data.doctorId,
      id: docRef.id,
      ...data,
      type,
    };
    await docRef.set(payload);
    return payload;
  }

  async findAll(): Promise<ScheduleExceptionDto[]> {
    const snapshot = await this.collection.get();
    return snapshot.docs.map((doc) => doc.data() as ScheduleExceptionDto);
  }

  async findAllByDoctorId(doctorId: string): Promise<ScheduleExceptionDto[]> {
    const snapshot = await this.collection
      .where('doctorId', '==', doctorId)
      .get();
    if (snapshot.empty) {
      throw new NotFoundException(
        `No schedule exceptions found for doctor ${doctorId}`,
      );
    }
    return snapshot.docs.map((doc) => doc.data() as ScheduleExceptionDto);
  }

  async findOne(id: string): Promise<ScheduleExceptionDto> {
    const doc = await this.collection.doc(id).get();
    if (!doc.exists) {
      throw new NotFoundException(`Schedule exception with ID ${id} not found`);
    }
    return doc.data() as ScheduleExceptionDto;
  }

  async update(
    id: string,
    data: UpdateScheduleExceptionDto,
  ): Promise<ScheduleExceptionDto> {
    const docRef = this.collection.doc(id);
    const existing = await docRef.get();

    if (!existing.exists) {
      throw new NotFoundException(`Schedule exception with ID ${id} not found`);
    }

    const updated = { ...existing.data(), ...data };
    await docRef.set(updated);
    return updated as ScheduleExceptionDto;
  }

  async delete(id: string): Promise<void> {
    const doc = await this.collection.doc(id).get();
    if (!doc.exists) {
      throw new NotFoundException(`Schedule exception with ID ${id} not found`);
    }
    await this.collection.doc(id).delete();
  }
}

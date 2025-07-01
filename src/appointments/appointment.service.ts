import { Injectable, NotFoundException } from '@nestjs/common';
import { Firestore } from 'firebase-admin/firestore';
import { getFirestore } from 'firebase-admin/firestore';
import {
  AppointmentDto,
  CreateAppointmentDto,
  UpdateAppointmentDto,
} from './dto/appointment.dto';

@Injectable()
export class AppointmentService {
  private db: Firestore;
  private collection: FirebaseFirestore.CollectionReference;

  constructor() {
    this.db = getFirestore();
    this.collection = this.db.collection('appointments');
  }

  async create(dto: CreateAppointmentDto): Promise<AppointmentDto> {
    const docRef = this.collection.doc();
    const appointment: AppointmentDto = { id: docRef.id, ...dto };
    await docRef.set(appointment);
    return appointment;
  }

  async findAll(): Promise<AppointmentDto[]> {
    const snapshot = await this.collection.get();
    return snapshot.docs.map((doc) => doc.data() as AppointmentDto);
  }

  async findOne(id: string): Promise<AppointmentDto> {
    const doc = await this.collection.doc(id).get();
    if (!doc.exists) {
      throw new NotFoundException('Appointment not found');
    }
    return doc.data() as AppointmentDto;
  }

  async update(id: string, dto: UpdateAppointmentDto): Promise<void> {
    await this.collection.doc(id).update({ ...dto });
  }

  async delete(id: string): Promise<void> {
    await this.collection.doc(id).delete();
  }
}

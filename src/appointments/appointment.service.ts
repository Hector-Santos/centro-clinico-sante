import { Injectable } from '@nestjs/common';
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
    return snapshot.docs.map(doc => doc.data() as AppointmentDto);
  }

  async findOne(id: string): Promise<AppointmentDto | null> {
    const doc = await this.collection.doc(id).get();
    return doc.exists ? (doc.data() as AppointmentDto) : null;
  }

  async update(id: string, dto: UpdateAppointmentDto): Promise<AppointmentDto> {
    const updated = { id, ...dto };
    await this.collection.doc(id).update(updated);
    return updated;
  }

  async remove(id: string): Promise<{ id: string }> {
    await this.collection.doc(id).delete();
    return { id };
  }
}
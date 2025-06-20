import { Injectable } from '@nestjs/common';
import { db } from 'firebase.admin';
import {
  CreatePatientDto,
  PatientDto,
  UpdatePatientDto,
} from './dto/patient-dto';

@Injectable()
export class PatientService {
  private collection = db.collection('patients');

  async create(dto: CreatePatientDto): Promise<PatientDto> {
    const docRef = this.collection.doc();
    const id = docRef.id;

    const patient: PatientDto = {
      id,
      name: dto.name,
      phone: dto.phone,
      doctorId: '', // Placeholder since CreatePatientDto does not include doctorId
    };

    await docRef.set(patient);
    return patient;
  }

  async findAll(): Promise<PatientDto[]> {
    const snapshot = await this.collection.get();
    return snapshot.docs.map((doc) => doc.data() as PatientDto);
  }

  async findOne(id: string): Promise<PatientDto | null> {
    const doc = await this.collection.doc(id).get();
    return doc.exists ? (doc.data() as PatientDto) : null;
  }

  async update(id: string, dto: UpdatePatientDto): Promise<PatientDto | null> {
    const ref = this.collection.doc(id);
    const doc = await ref.get();
    if (!doc.exists) return null;

    const updatePayload: any = {};
    if (dto.name !== undefined) updatePayload.name = dto.name;
    if (dto.phone !== undefined) updatePayload.phone = dto.phone;
    if (dto.doctorId !== undefined) updatePayload.doctorId = dto.doctorId;

    await ref.update(updatePayload);

    const updatedDoc = await ref.get();
    return updatedDoc.data() as PatientDto;
  }

  async remove(id: string): Promise<boolean> {
    const ref = this.collection.doc(id);
    const doc = await ref.get();
    if (!doc.exists) return false;

    await ref.delete();
    return true;
  }
}

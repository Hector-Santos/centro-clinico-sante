import { Injectable, NotFoundException } from '@nestjs/common';
import { db } from '../../firebase.admin';
import {
  CreatePatientDto,
  PatientDto,
  UpdatePatientDto,
} from './dto/patient-dto';

@Injectable()
export class PatientService {
  private collection = db.collection('patients');

  async create(patientData: CreatePatientDto): Promise<PatientDto> {
    const docRef = this.collection.doc();
    const id = docRef.id;

    const patient: PatientDto = {
      id,
      name: patientData.name,
      phone: patientData.phone,
      doctorId: patientData.doctorId,
    };

    await docRef.set(patient);
    return patient;
  }

  async findAll(): Promise<PatientDto[]> {
    const snapshot = await this.collection.get();
    return snapshot.docs.map((doc) => doc.data() as PatientDto);
  }

  async findOne(id: string): Promise<PatientDto> {
    const doc = await this.collection.doc(id).get();
    if (!doc.exists) throw new NotFoundException('Patient not found');
    return doc.data() as PatientDto;
  }

  async update(id: string, patient: UpdatePatientDto): Promise<void> {
    const ref = this.collection.doc(id);
    const doc = await ref.get();

    if (!doc.exists) throw new NotFoundException('Patient not found');

    await ref.update({ ...patient });
  }

  async remove(id: string): Promise<void> {
    const ref = this.collection.doc(id);
    const doc = await ref.get();
    if (!doc.exists) throw new NotFoundException('Patient not found');
    await ref.delete();
  }
}

import { Injectable } from '@nestjs/common';
import { db } from 'firebase.admin';
import { CreateDoctorDto, DoctorDto, UpdateDoctorDto } from './dto/doctor-dto';

@Injectable()
export class DoctorService {
  private collection = db.collection('doctors');

  async create(dto: CreateDoctorDto): Promise<DoctorDto> {
    const docRef = this.collection.doc();
    const id = docRef.id;

    const doctor: DoctorDto = {
      id,
      name: dto.name,
      phone: dto.phone,
    };

    await docRef.set(doctor);
    return doctor;
  }

  async findAll(): Promise<DoctorDto[]> {
    const snapshot = await this.collection.get();
    return snapshot.docs.map((doc) => doc.data() as DoctorDto);
  }

  async findOne(id: string): Promise<DoctorDto | null> {
    const doc = await this.collection.doc(id).get();
    return doc.exists ? (doc.data() as DoctorDto) : null;
  }

  async update(id: string, dto: UpdateDoctorDto): Promise<DoctorDto | null> {
    const ref = this.collection.doc(id);
    const doc = await ref.get();
    if (!doc.exists) return null;

    const updatePayload: any = {};
    if (dto.name !== undefined) updatePayload.name = dto.name;
    if (dto.phone !== undefined) updatePayload.phone = dto.phone;

    await ref.update(updatePayload);

    const updatedDoc = await ref.get();
    return updatedDoc.data() as DoctorDto;
  }

  async remove(id: string): Promise<boolean> {
    const ref = this.collection.doc(id);
    const doc = await ref.get();
    if (!doc.exists) return false;

    await ref.delete();
    return true;
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { db } from './../../firebase.admin';
import { CreateDoctorDto, DoctorDto, UpdateDoctorDto } from './dto/doctor-dto';

@Injectable()
export class DoctorService {
  private collection = db.collection('doctors');

  async create(data: CreateDoctorDto): Promise<DoctorDto> {
    const docRef = this.collection.doc();
    const id = docRef.id;

    const doctor: DoctorDto = {
      id,
      name: data.name,
      phone: data.phone,
    };

    await docRef.set(doctor);
    return doctor;
  }

  async findAll(): Promise<DoctorDto[]> {
    const snapshot = await this.collection.get();
    return snapshot.docs.map((doc) => doc.data() as DoctorDto);
  }

  async findOne(id: string): Promise<DoctorDto> {
    const doc = await this.collection.doc(id).get();
    if (!doc.exists) throw new NotFoundException('Doctor not found');
    return doc.data() as DoctorDto;
  }

  async update(id: string, doctor: UpdateDoctorDto): Promise<void> {
    const ref = this.collection.doc(id);
    const doc = await ref.get();

    if (!doc.exists) throw new NotFoundException('Doctor not found');

    await ref.update({ ...doctor });
  }

  async delete(id: string): Promise<void> {
    const ref = this.collection.doc(id);
    const doc = await ref.get();
    if (!doc.exists) throw new NotFoundException('Doctor not found');
    await ref.delete();
  }
}

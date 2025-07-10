import { Injectable, NotFoundException } from '@nestjs/common';
import { db } from '../../firebase.admin';
import { BookedDto, DayAvailabilityDto, ScheduleDto } from './dto/schedule.dto';

@Injectable()
export class ScheduleService {
  private collection = db.collection('schedules');

  async getScheduleByDoctorId(doctorId: string): Promise<ScheduleDto> {
    const doc = await this.collection.doc(doctorId).get();
    if (!doc.exists) throw new NotFoundException('Schedule not found');
    return doc.data() as ScheduleDto;
  }

  async getWeeklyAvailability(doctorId: string): Promise<DayAvailabilityDto[]> {
    const schedule = await this.getScheduleByDoctorId(doctorId);
    return schedule.weeklyAvailability;
  }

  async getDayAvailability(
    doctorId: string,
    dayIndex: number,
  ): Promise<DayAvailabilityDto> {
    const weekly = await this.getWeeklyAvailability(doctorId);
    return weekly[dayIndex];
  }

  async getBooked(doctorId: string): Promise<BookedDto[]> {
    const schedule = await this.getScheduleByDoctorId(doctorId);
    return schedule.booked || [];
  }

  async getBookedForPatient(
    doctorId: string,
    patientId: string,
  ): Promise<BookedDto> {
    const booked = await this.getBooked(doctorId);
    const match = booked.find((b) => b.patientId === patientId);
    if (!match)
      throw new NotFoundException('Booked entry not found for patient');
    return match;
  }

  async createSchedule(data: ScheduleDto): Promise<void> {
    const ref = this.collection.doc(data.doctorId);
    await ref.set({ ...data });
  }

  async createBooked(doctorId: string, booked: BookedDto): Promise<void> {
    const ref = this.collection.doc(doctorId);
    const doc = await ref.get();
    if (!doc.exists) throw new NotFoundException('Schedule not found');

    const existing = doc.data() as ScheduleDto;
    const updated = {
      ...existing,
      booked: [...(existing.booked || []), booked],
    };
    await ref.set(updated);
  }

  async updateSchedule(
    doctorId: string,
    data: Partial<ScheduleDto>,
  ): Promise<void> {
    const ref = this.collection.doc(doctorId);
    const doc = await ref.get();
    if (!doc.exists) throw new NotFoundException('Schedule not found');

    await ref.update({ ...data });
  }

  async updateWeekly(
    doctorId: string,
    weekly: DayAvailabilityDto[],
  ): Promise<void> {
    await this.updateSchedule(doctorId, { weeklyAvailability: weekly });
  }

  async updateDay(
    doctorId: string,
    dayIndex: number,
    day: DayAvailabilityDto,
  ): Promise<void> {
    const schedule = await this.getScheduleByDoctorId(doctorId);
    const weekly = [...schedule.weeklyAvailability];
    weekly[dayIndex] = day;
    await this.updateWeekly(doctorId, weekly);
  }

  async updateBooked(
    doctorId: string,
    updatedBooked: BookedDto,
  ): Promise<void> {
    const schedule = await this.getScheduleByDoctorId(doctorId);
    const booked = [...(schedule.booked || [])];
    const index = booked.findIndex(
      (b) => b.patientId === updatedBooked.patientId,
    );

    if (index === -1) throw new NotFoundException('Booked entry not found');

    booked[index] = updatedBooked;
    await this.updateSchedule(doctorId, { booked });
  }

  async deleteSchedule(doctorId: string): Promise<void> {
    const ref = this.collection.doc(doctorId);
    const doc = await ref.get();
    if (!doc.exists) throw new NotFoundException('Schedule not found');
    await ref.delete();
  }

  async deleteBooked(doctorId: string, patientId: string): Promise<void> {
    const schedule = await this.getScheduleByDoctorId(doctorId);
    const filtered = (schedule.booked || []).filter(
      (b) => b.patientId !== patientId,
    );
    await this.updateSchedule(doctorId, { booked: filtered });
  }

  async deleteAllBooked(doctorId: string): Promise<void> {
    await this.getScheduleByDoctorId(doctorId);
    await this.updateSchedule(doctorId, { booked: [] });
  }
}

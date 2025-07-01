// src/schedule/schedule.service.ts

import { Injectable } from '@nestjs/common';
import { db } from 'firebase.admin';
import {
  BookedDto,
  DayAvailabilityDto,
  ScheduleDto,
  ScheduleExceptionDto,
} from './dto/schedule.dto';
import { addWeeks, isBefore } from 'date-fns';

@Injectable()
export class ScheduleService {
  private collection = db.collection('schedules');

  async getScheduleByDoctorId(doctorId: string): Promise<ScheduleDto | null> {
    const doc = await this.collection.doc(doctorId).get();
    return doc.exists ? (doc.data() as ScheduleDto) : null;
  }

  async getWeeklyAvailability(
    doctorId: string,
  ): Promise<DayAvailabilityDto[] | null> {
    const schedule = await this.getScheduleByDoctorId(doctorId);
    return schedule?.weeklyAvailability || null;
  }

  async getDayAvailability(
    doctorId: string,
    dayIndex: number,
  ): Promise<DayAvailabilityDto | null> {
    const weekly = await this.getWeeklyAvailability(doctorId);
    return weekly?.[dayIndex] || null;
  }

  async getBooked(doctorId: string): Promise<BookedDto[]> {
    const schedule = await this.getScheduleByDoctorId(doctorId);
    return schedule?.booked || [];
  }

  async getBookedForPatient(
    doctorId: string,
    patientId: string,
  ): Promise<BookedDto | null> {
    const booked = await this.getBooked(doctorId);
    return booked.find((b) => b.patientId === patientId) || null;
  }

  async getExceptions(doctorId: string): Promise<ScheduleExceptionDto[]> {
    const schedule = await this.getScheduleByDoctorId(doctorId);
    return schedule?.exceptions || [];
  }

  async getExceptionById(
    doctorId: string,
    exceptionId: string,
  ): Promise<ScheduleExceptionDto | null> {
    const exceptions = await this.getExceptions(doctorId);
    return exceptions.find((e) => e.id === exceptionId) || null;
  }

  async createSchedule(dto: ScheduleDto): Promise<ScheduleDto> {
    await this.collection.doc(dto.doctorId).set(dto);
    return dto;
  }

  async createBooked(doctorId: string, dto: BookedDto): Promise<BookedDto> {
    const docRef = this.collection.doc(doctorId);
    const doc = await docRef.get();
    if (!doc.exists) throw new Error('Schedule not found');

    const data = doc.data() as ScheduleDto;
    data.booked = [...(data.booked || []), dto];
    await docRef.update({ booked: data.booked });

    return dto;
  }

  async createException(
    doctorId: string,
    dto: ScheduleExceptionDto,
  ): Promise<ScheduleExceptionDto> {
    const docRef = this.collection.doc(doctorId);
    const doc = await docRef.get();
    if (!doc.exists) throw new Error('Schedule not found');

    const data = doc.data() as ScheduleDto;
    data.exceptions = [...(data.exceptions || []), dto];
    await docRef.update({ exceptions: data.exceptions });

    return dto;
  }

  async updateSchedule(
    doctorId: string,
    dto: ScheduleDto,
  ): Promise<ScheduleDto> {
    await this.collection.doc(doctorId).update({ ...dto });
    return dto;
  }

  async updateWeekly(
    doctorId: string,
    dto: DayAvailabilityDto[],
  ): Promise<DayAvailabilityDto[]> {
    await this.collection.doc(doctorId).update({ weeklySchedule: dto });
    return dto;
  }

  async updateDay(
    doctorId: string,
    dayIndex: number,
    dto: DayAvailabilityDto,
  ): Promise<DayAvailabilityDto> {
    const docRef = this.collection.doc(doctorId);
    const doc = await docRef.get();
    if (!doc.exists) throw new Error('Schedule not found');

    const schedule = doc.data() as ScheduleDto;
    if (!schedule.weeklyAvailability[dayIndex])
      throw new Error('Invalid day index');

    schedule.weeklyAvailability[dayIndex] = dto;
    await docRef.update({ weeklySchedule: schedule.weeklyAvailability });

    return dto;
  }

  async updateBooked(
    doctorId: string,
    patientId: string,
    dto: BookedDto,
  ): Promise<BookedDto | null> {
    const docRef = this.collection.doc(doctorId);
    const doc = await docRef.get();
    if (!doc.exists) return null;

    const schedule = doc.data() as ScheduleDto;
    const index = schedule.booked.findIndex((b) => b.patientId === patientId);
    if (index === -1) return null;

    schedule.booked[index] = dto;
    await docRef.update({ booked: schedule.booked });

    return dto;
  }

  async deleteSchedule(doctorId: string): Promise<boolean> {
    const docRef = this.collection.doc(doctorId);
    const doc = await docRef.get();
    if (!doc.exists) return false;

    await docRef.delete();
    return true;
  }

  async deleteBooked(doctorId: string, patientId: string): Promise<boolean> {
    const docRef = this.collection.doc(doctorId);
    const doc = await docRef.get();
    if (!doc.exists) return false;

    const schedule = doc.data() as ScheduleDto;
    const filtered = schedule.booked.filter((b) => b.patientId !== patientId);

    if (filtered.length === schedule.booked.length) return false;
    await docRef.update({ booked: filtered });
    return true;
  }

  async deleteException(
    doctorId: string,
    exceptionId: string,
  ): Promise<boolean> {
    const docRef = this.collection.doc(doctorId);
    const doc = await docRef.get();
    if (!doc.exists) return false;

    const schedule = doc.data() as ScheduleDto;
    const filtered = schedule.exceptions.filter((e) => e.id !== exceptionId);

    if (filtered.length === schedule.exceptions.length) return false;
    await docRef.update({ exceptions: filtered });
    return true;
  }

  async deleteExceptionsByPatient(
    doctorId: string,
    patientId: string,
  ): Promise<number> {
    const ref = this.collection.doc(doctorId);
    const doc = await ref.get();
    if (!doc.exists) return 0;

    const schedule = doc.data() as ScheduleDto;
    const originalLength = schedule.exceptions.length;
    schedule.exceptions = schedule.exceptions.filter(
      (e) => e.patientId !== patientId,
    );
    await ref.update({ exceptions: schedule.exceptions });
    return originalLength - schedule.exceptions.length;
  }

  async deleteExpiredExceptions(doctorId: string): Promise<number> {
    const ref = this.collection.doc(doctorId);
    const doc = await ref.get();
    if (!doc.exists) return 0;

    const schedule = doc.data() as ScheduleDto;
    const now = new Date();
    const originalLength = schedule.exceptions.length;

    schedule.exceptions = schedule.exceptions.filter((e) => {
      if (!e.createdAt || !e.durationInWeeks) return true;
      const expiresAt = addWeeks(new Date(e.createdAt), e.durationInWeeks);
      return isBefore(now, expiresAt);
    });

    await ref.update({ exceptions: schedule.exceptions });
    return originalLength - schedule.exceptions.length;
  }

  async deleteExceptionByContent(
    doctorId: string,
    target: ScheduleExceptionDto,
  ): Promise<boolean> {
    const ref = this.collection.doc(doctorId);
    const doc = await ref.get();
    if (!doc.exists) return false;

    const schedule = doc.data() as ScheduleDto;
    const match = (a: any, b: any) => JSON.stringify(a) === JSON.stringify(b);

    const filtered = schedule.exceptions.filter((e) => {
      if (target.patientId && match(e.patientId, target.patientId)) {
        return (
          !match(e.originalBooking, target.originalBooking) ||
          !match(e.newBooking, target.newBooking)
        );
      }
      if (target.originalDays && match(e.originalDays, target.originalDays)) {
        return !match(e.NewDays, target.NewDays);
      }
      if (
        target.originalHours &&
        match(e.originalHours, target.originalHours)
      ) {
        return !match(e.newHours, target.newHours);
      }
      return true;
    });

    const changed = filtered.length < schedule.exceptions.length;
    if (changed) {
      await ref.update({ exceptions: filtered });
    }
    return changed;
  }
}

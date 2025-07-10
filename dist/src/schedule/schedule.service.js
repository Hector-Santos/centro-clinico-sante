"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduleService = void 0;
const firebase_admin_1 = require("firebase.admin");
const common_1 = require("@nestjs/common");
let ScheduleService = class ScheduleService {
    constructor() {
        this.collection = firebase_admin_1.db.collection('schedules');
    }
    async getScheduleByDoctorId(doctorId) {
        const doc = await this.collection.doc(doctorId).get();
        if (!doc.exists)
            throw new common_1.NotFoundException('Schedule not found');
        return doc.data();
    }
    async getWeeklyAvailability(doctorId) {
        const schedule = await this.getScheduleByDoctorId(doctorId);
        return schedule.weeklyAvailability;
    }
    async getDayAvailability(doctorId, dayIndex) {
        const weekly = await this.getWeeklyAvailability(doctorId);
        return weekly[dayIndex];
    }
    async getBooked(doctorId) {
        const schedule = await this.getScheduleByDoctorId(doctorId);
        return schedule.booked || [];
    }
    async getBookedForPatient(doctorId, patientId) {
        const booked = await this.getBooked(doctorId);
        const match = booked.find((b) => b.patientId === patientId);
        if (!match)
            throw new common_1.NotFoundException('Booked entry not found for patient');
        return match;
    }
    async getExceptions(doctorId) {
        const schedule = await this.getScheduleByDoctorId(doctorId);
        return schedule.exceptions || [];
    }
    async getExceptionById(doctorId, exceptionId) {
        const exceptions = await this.getExceptions(doctorId);
        const match = exceptions.find((e) => e.id === exceptionId);
        if (!match)
            throw new common_1.NotFoundException('Exception not found');
        return match;
    }
    async createSchedule(data) {
        const ref = this.collection.doc(data.doctorId);
        await ref.set({ ...data });
    }
    async createBooked(doctorId, booked) {
        const ref = this.collection.doc(doctorId);
        const doc = await ref.get();
        if (!doc.exists)
            throw new common_1.NotFoundException('Schedule not found');
        const existing = doc.data();
        const updated = {
            ...existing,
            booked: [...(existing.booked || []), booked],
        };
        await ref.set(updated);
    }
    async createException(doctorId, exception) {
        const ref = this.collection.doc(doctorId);
        const doc = await ref.get();
        if (!doc.exists)
            throw new common_1.NotFoundException('Schedule not found');
        const existing = doc.data();
        const updated = {
            ...existing,
            exceptions: [...(existing.exceptions || []), exception],
        };
        await ref.set(updated);
    }
    async updateSchedule(doctorId, data) {
        const ref = this.collection.doc(doctorId);
        const doc = await ref.get();
        if (!doc.exists)
            throw new common_1.NotFoundException('Schedule not found');
        await ref.update({ ...data });
    }
    async updateWeekly(doctorId, weekly) {
        await this.updateSchedule(doctorId, { weeklyAvailability: weekly });
    }
    async updateDay(doctorId, dayIndex, day) {
        const schedule = await this.getScheduleByDoctorId(doctorId);
        const weekly = [...schedule.weeklyAvailability];
        weekly[dayIndex] = day;
        await this.updateWeekly(doctorId, weekly);
    }
    async updateBooked(doctorId, updatedBooked) {
        const schedule = await this.getScheduleByDoctorId(doctorId);
        const booked = [...(schedule.booked || [])];
        const index = booked.findIndex((b) => b.patientId === updatedBooked.patientId);
        if (index === -1)
            throw new common_1.NotFoundException('Booked entry not found');
        booked[index] = updatedBooked;
        await this.updateSchedule(doctorId, { booked });
    }
    async deleteSchedule(doctorId) {
        const ref = this.collection.doc(doctorId);
        const doc = await ref.get();
        if (!doc.exists)
            throw new common_1.NotFoundException('Schedule not found');
        await ref.delete();
    }
    async deleteBooked(doctorId, patientId) {
        const schedule = await this.getScheduleByDoctorId(doctorId);
        const filtered = (schedule.booked || []).filter((b) => b.patientId !== patientId);
        await this.updateSchedule(doctorId, { booked: filtered });
    }
    async deleteException(doctorId, exceptionId) {
        const exceptions = await this.getExceptions(doctorId);
        const filtered = exceptions.filter((e) => e.id !== exceptionId);
        await this.updateSchedule(doctorId, { exceptions: filtered });
    }
    async deleteExceptionsByPatient(doctorId, patientId) {
        const exceptions = await this.getExceptions(doctorId);
        const filtered = exceptions.filter((e) => e.patientId !== patientId);
        await this.updateSchedule(doctorId, { exceptions: filtered });
    }
    async deleteExpiredExceptions(doctorId, now) {
        const exceptions = await this.getExceptions(doctorId);
        const filtered = exceptions.filter((e) => new Date(e.createdAt) > now);
        await this.updateSchedule(doctorId, { exceptions: filtered });
    }
    async deleteExceptionByContent(doctorId, data) {
        const exceptions = await this.getExceptions(doctorId);
        await this.updateSchedule(doctorId, { exceptions: filtered });
    }
};
exports.ScheduleService = ScheduleService;
exports.ScheduleService = ScheduleService = __decorate([
    (0, common_1.Injectable)()
], ScheduleService);
//# sourceMappingURL=schedule.service.js.map
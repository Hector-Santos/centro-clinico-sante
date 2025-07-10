"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentService = void 0;
const firestore_1 = require("firebase-admin/firestore");
const common_1 = require("@nestjs/common");
let AppointmentService = class AppointmentService {
    constructor() {
        this.db = (0, firestore_1.getFirestore)();
        this.collection = this.db.collection('appointments');
    }
    async create(appointment) {
        const docRef = this.collection.doc();
        const createdAppointment = {
            id: docRef.id,
            ...appointment,
        };
        await docRef.set(createdAppointment);
        return createdAppointment;
    }
    async findAll() {
        const snapshot = await this.collection.get();
        return snapshot.docs.map((doc) => doc.data());
    }
    async findOne(id) {
        const doc = await this.collection.doc(id).get();
        if (!doc.exists) {
            throw new common_1.NotFoundException('Appointment not found');
        }
        return doc.data();
    }
    async update(id, appointment) {
        await this.collection.doc(id).update({ ...appointment });
    }
    async delete(id) {
        await this.collection.doc(id).delete();
    }
};
exports.AppointmentService = AppointmentService;
exports.AppointmentService = AppointmentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], AppointmentService);
//# sourceMappingURL=appointment.service.js.map
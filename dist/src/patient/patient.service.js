"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientService = void 0;
const common_1 = require("@nestjs/common");
const firebase_admin_1 = require("../../firebase.admin");
let PatientService = class PatientService {
    constructor() {
        this.collection = firebase_admin_1.db.collection('patients');
    }
    async create(patientData) {
        const docRef = this.collection.doc();
        const id = docRef.id;
        const patient = {
            id,
            name: patientData.name,
            phone: patientData.phone,
            doctorId: patientData.doctorId,
        };
        await docRef.set(patient);
        return patient;
    }
    async findAll() {
        const snapshot = await this.collection.get();
        return snapshot.docs.map((doc) => doc.data());
    }
    async findOne(id) {
        const doc = await this.collection.doc(id).get();
        if (!doc.exists)
            throw new common_1.NotFoundException('Patient not found');
        return doc.data();
    }
    async update(id, patient) {
        const ref = this.collection.doc(id);
        const doc = await ref.get();
        if (!doc.exists)
            throw new common_1.NotFoundException('Patient not found');
        await ref.update({ ...patient });
    }
    async remove(id) {
        const ref = this.collection.doc(id);
        const doc = await ref.get();
        if (!doc.exists)
            throw new common_1.NotFoundException('Patient not found');
        await ref.delete();
    }
};
exports.PatientService = PatientService;
exports.PatientService = PatientService = __decorate([
    (0, common_1.Injectable)()
], PatientService);
//# sourceMappingURL=patient.service.js.map
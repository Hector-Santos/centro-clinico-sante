"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorService = void 0;
const common_1 = require("@nestjs/common");
const firebase_admin_1 = require("../../firebase.admin");
let DoctorService = class DoctorService {
    constructor() {
        this.collection = firebase_admin_1.db.collection('doctors');
    }
    async create(dto) {
        const docRef = this.collection.doc();
        const id = docRef.id;
        const doctor = {
            id,
            name: dto.name,
            phone: dto.phone,
        };
        await docRef.set(doctor);
        return doctor;
    }
    async findAll() {
        const snapshot = await this.collection.get();
        return snapshot.docs.map((doc) => doc.data());
    }
    async findOne(id) {
        const doc = await this.collection.doc(id).get();
        return doc.exists ? doc.data() : null;
    }
    async update(id, dto) {
        const ref = this.collection.doc(id);
        const doc = await ref.get();
        if (!doc.exists)
            return null;
        const updatePayload = {};
        if (dto.name !== undefined)
            updatePayload.name = dto.name;
        if (dto.phone !== undefined)
            updatePayload.phone = dto.phone;
        await ref.update(updatePayload);
        const updatedDoc = await ref.get();
        return updatedDoc.data();
    }
    async remove(id) {
        const ref = this.collection.doc(id);
        const doc = await ref.get();
        if (!doc.exists)
            return false;
        await ref.delete();
        return true;
    }
};
exports.DoctorService = DoctorService;
exports.DoctorService = DoctorService = __decorate([
    (0, common_1.Injectable)()
], DoctorService);
//# sourceMappingURL=doctor.service.js.map
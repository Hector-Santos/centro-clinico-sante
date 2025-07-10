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
const firebase_admin_1 = require("./../../firebase.admin");
let DoctorService = class DoctorService {
    constructor() {
        this.collection = firebase_admin_1.db.collection('doctors');
    }
    async create(data) {
        const docRef = this.collection.doc();
        const id = docRef.id;
        const doctor = {
            id,
            name: data.name,
            phone: data.phone,
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
        if (!doc.exists)
            throw new common_1.NotFoundException('Doctor not found');
        return doc.data();
    }
    async update(id, doctor) {
        const ref = this.collection.doc(id);
        const doc = await ref.get();
        if (!doc.exists)
            throw new common_1.NotFoundException('Doctor not found');
        await ref.update({ ...doctor });
    }
    async delete(id) {
        const ref = this.collection.doc(id);
        const doc = await ref.get();
        if (!doc.exists)
            throw new common_1.NotFoundException('Doctor not found');
        await ref.delete();
    }
};
exports.DoctorService = DoctorService;
exports.DoctorService = DoctorService = __decorate([
    (0, common_1.Injectable)()
], DoctorService);
//# sourceMappingURL=doctor.service.js.map
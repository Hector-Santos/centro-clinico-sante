"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheService = void 0;
const common_1 = require("@nestjs/common");
const firebase_admin_1 = require("../../firebase.admin");
let CacheService = class CacheService {
    constructor() {
        this.db = firebase_admin_1.db;
    }
    async updateCachedPatient(doctorId, patient) {
        const ref = this.db
            .collection('cache')
            .doc(`${doctorId}`)
            .collection('patients')
            .doc(patient.patientId);
        await ref.set(patient, { merge: true });
    }
    async deleteCachedPatient(doctorId, patientId) {
        const ref = this.db
            .collection('cache')
            .doc(`patients_${doctorId}`)
            .collection('patients')
            .doc(patientId);
        await ref.delete();
    }
};
exports.CacheService = CacheService;
exports.CacheService = CacheService = __decorate([
    (0, common_1.Injectable)()
], CacheService);
//# sourceMappingURL=cache.service.js.map
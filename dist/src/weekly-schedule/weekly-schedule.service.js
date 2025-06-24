"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeeklyScheduleService = void 0;
const common_1 = require("@nestjs/common");
const firebase_admin_1 = require("../../firebase.admin");
let WeeklyScheduleService = class WeeklyScheduleService {
    constructor() {
        this.collection = firebase_admin_1.db.collection('weeklySchedules');
    }
    async create(dto) {
        const docRef = this.collection.doc();
        const id = docRef.id;
        const data = { id, ...dto };
        await docRef.set(data);
        return data;
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
        await this.collection.doc(id).update(dto);
        const updated = await this.collection.doc(id).get();
        return updated.data();
    }
    async delete(id) {
        await this.collection.doc(id).delete();
    }
};
exports.WeeklyScheduleService = WeeklyScheduleService;
exports.WeeklyScheduleService = WeeklyScheduleService = __decorate([
    (0, common_1.Injectable)()
], WeeklyScheduleService);
//# sourceMappingURL=weekly-schedule.service.js.map
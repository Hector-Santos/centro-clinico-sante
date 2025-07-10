"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceService = void 0;
const firebase_admin_1 = require("../../firebase.admin");
const common_1 = require("@nestjs/common");
let InvoiceService = class InvoiceService {
    constructor() {
        this.collection = firebase_admin_1.db.collection('invoices');
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
        const cleanData = Object.fromEntries(Object.entries(dto).filter(([_, v]) => v !== undefined));
        await this.collection.doc(id).update(cleanData);
        const updated = await this.collection.doc(id).get();
        return updated.data();
    }
    async delete(id) {
        await this.collection.doc(id).delete();
    }
};
exports.InvoiceService = InvoiceService;
exports.InvoiceService = InvoiceService = __decorate([
    (0, common_1.Injectable)()
], InvoiceService);
//# sourceMappingURL=invoice.service.js.map
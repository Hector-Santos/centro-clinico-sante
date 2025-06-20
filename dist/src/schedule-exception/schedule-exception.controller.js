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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduleExceptionController = void 0;
const common_1 = require("@nestjs/common");
const schedule_exception_dto_1 = require("./dto/schedule-exception.dto");
const schedule_exception_service_1 = require("./schedule-exception.service");
let ScheduleExceptionController = class ScheduleExceptionController {
    constructor(service) {
        this.service = service;
    }
    async create(dto) {
        return await this.service.create(dto);
    }
    async findAll() {
        return await this.service.findAll();
    }
    async findOne(id) {
        return await this.service.findOne(id);
    }
    async update(id, dto) {
        return await this.service.update(id, dto);
    }
    async delete(id) {
        return await this.service.delete(id);
    }
};
exports.ScheduleExceptionController = ScheduleExceptionController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [schedule_exception_dto_1.ScheduleExceptionDto]),
    __metadata("design:returntype", Promise)
], ScheduleExceptionController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ScheduleExceptionController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ScheduleExceptionController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ScheduleExceptionController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ScheduleExceptionController.prototype, "delete", null);
exports.ScheduleExceptionController = ScheduleExceptionController = __decorate([
    (0, common_1.Controller)('schedule-exceptions'),
    __metadata("design:paramtypes", [schedule_exception_service_1.ScheduleExceptionService])
], ScheduleExceptionController);
//# sourceMappingURL=schedule-exception.controller.js.map
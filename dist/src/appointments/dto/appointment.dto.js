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
exports.UpdateAppointmentDto = exports.CreateAppointmentDto = exports.AppointmentDto = exports.AppointmentStatus = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const is_future_date_validator_1 = require("../../common/validators/is-future-date.validator");
var AppointmentStatus;
(function (AppointmentStatus) {
    AppointmentStatus["Pending"] = "pending";
    AppointmentStatus["Confirmed"] = "confirmed";
    AppointmentStatus["Cancelled"] = "cancelled";
    AppointmentStatus["Completed"] = "completed";
    AppointmentStatus["Absence"] = "absence";
})(AppointmentStatus || (exports.AppointmentStatus = AppointmentStatus = {}));
class AppointmentDto {
}
exports.AppointmentDto = AppointmentDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AppointmentDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AppointmentDto.prototype, "doctorId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AppointmentDto.prototype, "patientId", void 0);
__decorate([
    (0, is_future_date_validator_1.IsFutureDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], AppointmentDto.prototype, "datetime", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(AppointmentStatus),
    __metadata("design:type", String)
], AppointmentDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], AppointmentDto.prototype, "price", void 0);
class CreateAppointmentDto {
}
exports.CreateAppointmentDto = CreateAppointmentDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAppointmentDto.prototype, "doctorId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAppointmentDto.prototype, "patientId", void 0);
__decorate([
    (0, is_future_date_validator_1.IsFutureDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], CreateAppointmentDto.prototype, "datetime", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(AppointmentStatus),
    __metadata("design:type", String)
], CreateAppointmentDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateAppointmentDto.prototype, "price", void 0);
class UpdateAppointmentDto {
}
exports.UpdateAppointmentDto = UpdateAppointmentDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateAppointmentDto.prototype, "doctorId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateAppointmentDto.prototype, "patientId", void 0);
__decorate([
    (0, is_future_date_validator_1.IsFutureDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], UpdateAppointmentDto.prototype, "datetime", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(AppointmentStatus),
    __metadata("design:type", String)
], UpdateAppointmentDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateAppointmentDto.prototype, "price", void 0);
//# sourceMappingURL=appointment.dto.js.map
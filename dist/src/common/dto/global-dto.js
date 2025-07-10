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
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const is_future_date_validator_1 = require("../../common/validators/is-future-date.validator");
const regex_reference_1 = require("../references/regex-reference");
const is_hour_decorator_1 = require("./../decorators/is-hour.decorator");
const ;
class WeeklyScheduleDto {
}
__decorate([
    (0, is_hour_decorator_1.IsHour)({ each: true }),
    __metadata("design:type", Array)
], WeeklyScheduleDto.prototype, "monday", void 0);
__decorate([
    (0, is_hour_decorator_1.IsHour)({ each: true }),
    __metadata("design:type", Array)
], WeeklyScheduleDto.prototype, "tuesday", void 0);
__decorate([
    (0, is_hour_decorator_1.IsHour)({ each: true }),
    __metadata("design:type", Array)
], WeeklyScheduleDto.prototype, "wednesday", void 0);
__decorate([
    (0, is_hour_decorator_1.IsHour)({ each: true }),
    __metadata("design:type", Array)
], WeeklyScheduleDto.prototype, "thursday", void 0);
__decorate([
    (0, is_hour_decorator_1.IsHour)({ each: true }),
    __metadata("design:type", Array)
], WeeklyScheduleDto.prototype, "friday", void 0);
__decorate([
    (0, is_hour_decorator_1.IsHour)({ each: true }),
    __metadata("design:type", Array)
], WeeklyScheduleDto.prototype, "saturday", void 0);
__decorate([
    (0, is_hour_decorator_1.IsHour)({ each: true }),
    __metadata("design:type", Array)
], WeeklyScheduleDto.prototype, "sunday", void 0);
const ;
class ScheduleDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ScheduleDto.prototype, "doctorId", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => WeeklyScheduleDto),
    __metadata("design:type", WeeklyScheduleDto)
], ScheduleDto.prototype, "weeklySchedule", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ScheduleExceptionDto),
    __metadata("design:type", Array)
], ScheduleDto.prototype, "exceptions", void 0);
const ;
class ScheduleExceptionDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ScheduleExceptionDto.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Date),
    (0, is_future_date_validator_1.IsFutureDate)(),
    __metadata("design:type", Date)
], ScheduleExceptionDto.prototype, "originalDate", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Date),
    (0, is_future_date_validator_1.IsFutureDate)(),
    __metadata("design:type", Date)
], ScheduleExceptionDto.prototype, "newDate", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, is_hour_decorator_1.IsHour)({ each: true }),
    __metadata("design:type", Array)
], ScheduleExceptionDto.prototype, "newTimes", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], ScheduleExceptionDto.prototype, "durationInWeeks", void 0);
const ;
class PatientDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PatientDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PatientDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PatientDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PatientDto.prototype, "doctorId", void 0);
const ;
class AppointmentDto {
}
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
const ;
class InvoiceDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], InvoiceDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], InvoiceDto.prototype, "patientId", void 0);
__decorate([
    (0, class_validator_1.Matches)(regex_reference_1.InvoiceMonthPattern),
    __metadata("design:type", String)
], InvoiceDto.prototype, "referenceMonth", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(InvoiceStatus),
    __metadata("design:type", String)
], InvoiceDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], InvoiceDto.prototype, "createdAt", void 0);
__decorate([
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], InvoiceDto.prototype, "dueDate", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], InvoiceDto.prototype, "txid", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], InvoiceDto.prototype, "qrCode", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], InvoiceDto.prototype, "paidAt", void 0);
//# sourceMappingURL=global-dto.js.map
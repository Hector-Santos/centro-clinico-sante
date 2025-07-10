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
exports.UpdateScheduleExceptionDto = exports.CreateScheduleExceptionDto = exports.ScheduleDto = exports.ScheduleExceptionDto = exports.DayAvailabilityDto = exports.HourRangeDto = exports.BookedDto = exports.SlotDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const mapped_types_1 = require("@nestjs/mapped-types");
const is_hour_decorator_1 = require("../../common/decorators/is-hour.decorator");
const has_distinct_index_decorator_1 = require("../../common/decorators/has-distinct-index.decorator");
class SlotDto {
}
exports.SlotDto = SlotDto;
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(6),
    __metadata("design:type", Number)
], SlotDto.prototype, "weekday", void 0);
__decorate([
    (0, is_hour_decorator_1.IsHour)(),
    __metadata("design:type", String)
], SlotDto.prototype, "hour", void 0);
class BookedDto {
}
exports.BookedDto = BookedDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BookedDto.prototype, "patientId", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => SlotDto),
    __metadata("design:type", Array)
], BookedDto.prototype, "patientBookings", void 0);
class HourRangeDto {
}
exports.HourRangeDto = HourRangeDto;
__decorate([
    (0, is_hour_decorator_1.IsHour)(),
    __metadata("design:type", String)
], HourRangeDto.prototype, "start", void 0);
__decorate([
    (0, is_hour_decorator_1.IsHour)(),
    __metadata("design:type", String)
], HourRangeDto.prototype, "end", void 0);
class DayAvailabilityDto {
}
exports.DayAvailabilityDto = DayAvailabilityDto;
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(6),
    __metadata("design:type", Number)
], DayAvailabilityDto.prototype, "weekdayIndex", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => HourRangeDto),
    __metadata("design:type", Array)
], DayAvailabilityDto.prototype, "intervals", void 0);
class ScheduleExceptionDto {
}
exports.ScheduleExceptionDto = ScheduleExceptionDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ScheduleExceptionDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ScheduleExceptionDto.prototype, "patientId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => BookedDto),
    __metadata("design:type", BookedDto)
], ScheduleExceptionDto.prototype, "originalBooking", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => BookedDto),
    __metadata("design:type", BookedDto)
], ScheduleExceptionDto.prototype, "newBooking", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => DayAvailabilityDto),
    __metadata("design:type", Array)
], ScheduleExceptionDto.prototype, "originalDays", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => DayAvailabilityDto),
    __metadata("design:type", Array)
], ScheduleExceptionDto.prototype, "NewDays", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => HourRangeDto),
    __metadata("design:type", Array)
], ScheduleExceptionDto.prototype, "originalHours", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => HourRangeDto),
    __metadata("design:type", Array)
], ScheduleExceptionDto.prototype, "newHours", void 0);
__decorate([
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], ScheduleExceptionDto.prototype, "createdAt", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], ScheduleExceptionDto.prototype, "durationInWeeks", void 0);
class ScheduleDto {
}
exports.ScheduleDto = ScheduleDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ScheduleDto.prototype, "doctorId", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMaxSize)(6),
    (0, has_distinct_index_decorator_1.HasDistinctIndex)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => DayAvailabilityDto),
    __metadata("design:type", Array)
], ScheduleDto.prototype, "weeklyAvailability", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => BookedDto),
    __metadata("design:type", Array)
], ScheduleDto.prototype, "booked", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ScheduleExceptionDto),
    __metadata("design:type", Array)
], ScheduleDto.prototype, "exceptions", void 0);
class CreateScheduleExceptionDto extends (0, mapped_types_1.OmitType)(ScheduleExceptionDto, [
    'id',
]) {
}
exports.CreateScheduleExceptionDto = CreateScheduleExceptionDto;
class UpdateScheduleExceptionDto extends (0, mapped_types_1.PartialType)(CreateScheduleExceptionDto) {
}
exports.UpdateScheduleExceptionDto = UpdateScheduleExceptionDto;
//# sourceMappingURL=schedule.dto.js.map
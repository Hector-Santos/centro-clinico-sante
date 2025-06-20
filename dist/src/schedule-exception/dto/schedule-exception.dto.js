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
exports.ScheduleExceptionDto = void 0;
const class_transformer_1 = require("class-transformer");
const is_future_date_validator_1 = require("../../common/validators/is-future-date.validator");
const is_hour_decorator_1 = require("../../common/decorators/is-hour.decorator");
const class_validator_1 = require("class-validator");
class ScheduleExceptionDto {
}
exports.ScheduleExceptionDto = ScheduleExceptionDto;
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
//# sourceMappingURL=schedule-exception.dto.js.map
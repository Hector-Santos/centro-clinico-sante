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
exports.WeeklyScheduleDto = void 0;
const class_validator_1 = require("class-validator");
const is_hour_decorator_1 = require("../../common/decorators/is-hour.decorator");
class WeeklyScheduleDto {
}
exports.WeeklyScheduleDto = WeeklyScheduleDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WeeklyScheduleDto.prototype, "id", void 0);
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
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WeeklyScheduleDto.prototype, "doctorId", void 0);
//# sourceMappingURL=weekly-schedule.dto.js.map
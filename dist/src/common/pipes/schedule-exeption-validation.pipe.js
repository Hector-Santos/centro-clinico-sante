"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduleExceptionValidationPipe = void 0;
const class_transformer_1 = require("class-transformer");
const common_1 = require("@nestjs/common");
const schedule_dto_1 = require("../../schedule/dto/schedule.dto");
const schedule_exception_validator_1 = require("../validators/schedule-exception.validator");
let ScheduleExceptionValidationPipe = class ScheduleExceptionValidationPipe {
    transform(value) {
        if (!value || typeof value !== 'object') {
            throw new common_1.BadRequestException('Invalid schedule exception input.');
        }
        const instance = (0, class_transformer_1.plainToInstance)(schedule_dto_1.ScheduleExceptionDto, value);
        (0, schedule_exception_validator_1.validateScheduleException)(instance);
        return instance;
    }
};
exports.ScheduleExceptionValidationPipe = ScheduleExceptionValidationPipe;
exports.ScheduleExceptionValidationPipe = ScheduleExceptionValidationPipe = __decorate([
    (0, common_1.Injectable)()
], ScheduleExceptionValidationPipe);
//# sourceMappingURL=schedule-exeption-validation.pipe.js.map
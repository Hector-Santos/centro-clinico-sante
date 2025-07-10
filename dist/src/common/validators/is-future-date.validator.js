"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsFutureDateConstraint = void 0;
exports.IsFutureDate = IsFutureDate;
const class_validator_1 = require("class-validator");
let IsFutureDateConstraint = class IsFutureDateConstraint {
    validate(date, _args) {
        return date instanceof Date && date.getTime() > Date.now();
    }
};
exports.IsFutureDateConstraint = IsFutureDateConstraint;
exports.IsFutureDateConstraint = IsFutureDateConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'IsFutureDate', async: false })
], IsFutureDateConstraint);
function IsFutureDate(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            validator: IsFutureDateConstraint,
        });
    };
}
//# sourceMappingURL=is-future-date.validator.js.map
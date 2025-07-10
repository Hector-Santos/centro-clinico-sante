"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HasDistinctIndexConstraint = void 0;
exports.HasDistinctIndex = HasDistinctIndex;
const class_validator_1 = require("class-validator");
let HasDistinctIndexConstraint = class HasDistinctIndexConstraint {
    validate(value, _args) {
        if (!Array.isArray(value))
            return false;
        const seen = new Set();
        for (const item of value) {
            if (typeof item !== 'object' || item === null)
                continue;
            const indexKey = Object.keys(item).find((key) => typeof item[key] === 'number' && key.toLowerCase().includes('index'));
            if (indexKey === undefined)
                continue;
            const indexValue = item[indexKey];
            if (seen.has(indexValue))
                return false;
            seen.add(indexValue);
        }
        return true;
    }
    defaultMessage(args) {
        return `All index-like values (e.g., weekdayIndex, dayIndex) must be distinct in '${args.property}'.`;
    }
};
exports.HasDistinctIndexConstraint = HasDistinctIndexConstraint;
exports.HasDistinctIndexConstraint = HasDistinctIndexConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'HasDistinctIndex', async: false })
], HasDistinctIndexConstraint);
function HasDistinctIndex(options) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'HasDistinctIndex',
            target: object.constructor,
            propertyName,
            options,
            validator: HasDistinctIndexConstraint,
        });
    };
}
//# sourceMappingURL=has-distinct-index.decorator.js.map
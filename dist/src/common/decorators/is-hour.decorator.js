"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsHour = IsHour;
const class_validator_1 = require("class-validator");
function IsHour(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'isHour',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value, _args) {
                    return (typeof value === 'string' &&
                        /^([01]\d|2[0-3]):([0-5]\d)$/.test(value));
                },
                defaultMessage(_args) {
                    return 'Invalid hour format. Expected HH:mm (e.g. 08:00)';
                },
            },
        });
    };
}
//# sourceMappingURL=is-hour.decorator.js.map
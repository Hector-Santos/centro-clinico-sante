/* eslint-disable @typescript-eslint/no-unused-vars */
// src/common/decorators/is-hour.decorator.ts
import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsHour(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isHour',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, _args: ValidationArguments) {
          return (
            typeof value === 'string' &&
            /^([01]\d|2[0-3]):([0-5]\d)$/.test(value)
          );
        },
        defaultMessage(_args: ValidationArguments) {
          return 'Invalid hour format. Expected HH:mm (e.g. 08:00)';
        },
      },
    });
  };
}

import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

// Custom decorator: checks that newWeekDay !== oldWeekDay
export function IsDifferentDay(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isDifferentDay',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const old = (args.object as any).oldWeekDay;
          return value !== old;
        },
      },
    });
  };
}

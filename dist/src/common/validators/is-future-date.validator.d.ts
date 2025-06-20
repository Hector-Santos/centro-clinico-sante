import { ValidationOptions, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
export declare class IsFutureDateConstraint implements ValidatorConstraintInterface {
    validate(date: any, _args: ValidationArguments): boolean;
}
export declare function IsFutureDate(validationOptions?: ValidationOptions): (object: object, propertyName: string) => void;

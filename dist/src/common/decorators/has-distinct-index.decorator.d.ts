import { ValidationArguments, ValidationOptions, ValidatorConstraintInterface } from 'class-validator';
export declare class HasDistinctIndexConstraint implements ValidatorConstraintInterface {
    validate(value: any[], _args: ValidationArguments): boolean;
    defaultMessage(args: ValidationArguments): string;
}
export declare function HasDistinctIndex(options?: ValidationOptions): (object: object, propertyName: string) => void;

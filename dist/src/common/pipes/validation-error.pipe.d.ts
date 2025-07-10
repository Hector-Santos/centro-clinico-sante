import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
export declare class CustomValidationPipe implements PipeTransform {
    transform(value: any, { metatype }: ArgumentMetadata): Promise<any>;
    private toValidate;
}

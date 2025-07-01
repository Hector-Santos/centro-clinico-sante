/* eslint-disable @typescript-eslint/ban-types */
import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import * as ErrorReference from '../references/error-reference';

const ValidationErrorIndex: Record<string, { code: string; message: string }> =
  {};
Object.values(ErrorReference).forEach((error: any) => {
  const key = `${error.dto}.${error.field}.${error.validator.toLowerCase()}`;
  ValidationErrorIndex[key] = { code: error.code, message: error.message };
});

@Injectable()
export class CustomValidationPipe implements PipeTransform {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) return value;

    const object = plainToInstance(metatype, value);
    const errors = await validate(object, {
      whitelist: true,
      forbidNonWhitelisted: true,
      stopAtFirstError: false,
    });

    if (errors.length === 0) return value;

    const formattedErrors = [];

    for (const error of errors) {
      const field = error.property;
      const constraints = error.constraints || {};

      for (const validator of Object.keys(constraints)) {
        const key = `${metatype.name}.${field}.${validator.toLowerCase()}`;
        formattedErrors.push(
          ValidationErrorIndex[key] ?? {
            code: 'UNMAPPED_VALIDATION_ERROR',
            message: constraints[validator],
          },
        );
      }
    }
    throw new BadRequestException(formattedErrors);
  }

  private toValidate(metatype: unknown): boolean {
    return ![String, Boolean, Number, Array, Object].includes(metatype as any);
  }
}

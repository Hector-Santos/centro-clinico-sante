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

// Build fast lookup index
const ValidationErrorIndex: Record<string, { code: string; message: string }> =
  {};

Object.values(ErrorReference).forEach((error: any) => {
  const key = `${error.dto}.${error.field}.${error.validator}`;
  ValidationErrorIndex[key] = { code: error.code, message: error.message };
});

@Injectable()
export class CustomValidationPipe implements PipeTransform {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) return value;

    const object = plainToInstance(metatype, value);
    const [error] = await validate(object, {
      whitelist: true,
      forbidNonWhitelisted: true,
      stopAtFirstError: true,
    });

    if (!error) return value;

    const field = error.property;
    const validator = Object.keys(error.constraints || {})[0];
    const fallback = error.constraints?.[validator];
    const key = `${metatype.name}.${field}.${validator}`;
    const match = ValidationErrorIndex[key];

    throw new BadRequestException(
      match ?? { code: 'UNMAPPED_VALIDATION_ERROR', message: fallback },
    );
  }

  private toValidate(metatype: unknown): boolean {
    const primitives = [String, Boolean, Number, Array, Object] as unknown[];
    return !primitives.includes(metatype);
  }
}

import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { PipeTransform, BadRequestException } from '@nestjs/common';

export class MatchDtoPipe implements PipeTransform {
  constructor(private readonly dtoClass: any) {}

  transform(value: any) {
    const instance = plainToInstance(this.dtoClass, value);
    const errors = validateSync(instance, {
      whitelist: true,
      forbidNonWhitelisted: true,
    });

    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    return instance;
  }
}

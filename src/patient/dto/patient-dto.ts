import { IsString, IsNotEmpty, Matches } from 'class-validator';

import { OmitType, PartialType } from '@nestjs/mapped-types';

import { WhatsAppNumberPattern } from '../../common/references/regex-reference';

export class PatientDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  //@Matches(WhatsAppNumberPattern)
  phone: string;

  @IsString()
  @IsNotEmpty()
  doctorId: string;
}

export class CreatePatientDto extends OmitType(PatientDto, [
  'id',
 // 'doctorId',
]) {}

export class UpdatePatientDto extends PartialType(PatientDto) {}

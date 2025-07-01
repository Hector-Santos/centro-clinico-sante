import { IsString, IsNotEmpty, Matches } from 'class-validator';
import { OmitType, PartialType } from '@nestjs/mapped-types';
import { WhatsAppNumberPattern } from 'src/common/references/regex-reference';

export class DoctorDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @Matches(WhatsAppNumberPattern)
  phone: string;
}

export class CreateDoctorDto extends OmitType(DoctorDto, ['id']) {}

export class UpdateDoctorDto extends PartialType(CreateDoctorDto) {}

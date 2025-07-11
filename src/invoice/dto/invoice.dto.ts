import { Type } from 'class-transformer';
import { IsString, IsEnum, IsDate, IsOptional, Matches } from 'class-validator';

import { OmitType, PartialType } from '@nestjs/mapped-types';
import { InvoiceMonthPattern } from '../../common/references/regex-reference';

export enum InvoiceStatus {
  Pending = 'pending',
  Paid = 'paid',
  Overdue = 'overdue',
}

export class InvoiceDto {
  @IsString()
  id: string;

  @IsString()
  patientId: string;

  @Matches(InvoiceMonthPattern)
  referenceMonth: string;

  @IsEnum(InvoiceStatus)
  status: InvoiceStatus;

  @IsDate()
  @Type(() => Date)
  createdAt: Date;

  @IsDate()
  @Type(() => Date)
  dueDate: Date;

  @IsString()
  txid: string;

  @IsString()
  qrCode: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  paidAt: Date | null;
}

export class CreateInvoiceDto extends OmitType(InvoiceDto, ['id']) {}

export class UpdateInvoiceDto extends PartialType(CreateInvoiceDto) {}

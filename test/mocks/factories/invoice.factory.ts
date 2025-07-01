import { faker } from '@faker-js/faker';
import {
  InvoiceDto,
  CreateInvoiceDto,
  UpdateInvoiceDto,
  InvoiceStatus,
} from '../../../src/invoice/dto/invoice.dto';

export const CreateInvoiceMock = (
  overrides: Partial<CreateInvoiceDto> = {},
): CreateInvoiceDto => ({
  patientId: faker.string.uuid(),
  referenceMonth: faker.date.month({ abbreviated: false }) + '/2025',
  status: faker.helpers.arrayElement(Object.values(InvoiceStatus)),
  createdAt: faker.date.recent(),
  dueDate: faker.date.soon(),
  txid: faker.string.alphanumeric(16),
  qrCode: faker.internet.url(),
  paidAt: faker.datatype.boolean() ? faker.date.recent() : null,
  ...overrides,
});

export const UpdateInvoiceMock = (): UpdateInvoiceDto => ({
  ...CreateInvoiceMock(),
});

export const InvoiceMock = (): InvoiceDto => {
  const base = CreateInvoiceMock();
  return {
    ...base,
    id: faker.string.uuid(),
  };
};

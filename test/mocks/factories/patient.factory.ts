import { faker } from '@faker-js/faker';
import {
  CreatePatientDto,
  UpdatePatientDto,
  PatientDto,
} from '../../../src/patient/dto/patient-dto';
import { generateWhatsAppNumber } from './utils.factory';

export const CreatePatientMock = (
  overrides: UpdatePatientDto = {},
): CreatePatientDto => ({
  name: faker.person.fullName(),
  phone: generateWhatsAppNumber(),
  ...overrides,
});

export const UpdatePatientMock = (): UpdatePatientDto => ({
  ...CreatePatientMock(),
});

export const PatientMock = (): PatientDto => {
  const base = CreatePatientMock();
  return {
    ...base,
    id: faker.string.uuid(),
    doctorId: faker.string.uuid(),
  };
};

import { faker } from '@faker-js/faker';
import {
  CreateDoctorDto,
  DoctorDto,
  UpdateDoctorDto,
} from '../../../src/doctor/dto/doctor-dto';
import { generateWhatsAppNumber } from './utils.factory';

export const CreateDoctorMock = (
  overrides: UpdateDoctorDto = {},
): CreateDoctorDto => ({
  name: faker.person.fullName(),
  phone: generateWhatsAppNumber(),
  ...overrides,
});

export const UpdateDoctorMock = (): UpdateDoctorDto => ({
  ...CreateDoctorMock(),
});

export const DoctorMock = (): DoctorDto => {
  const base = CreateDoctorMock();
  return {
    ...base,
    id: faker.string.uuid(),
  };
};

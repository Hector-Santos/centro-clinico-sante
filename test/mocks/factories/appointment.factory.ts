import { faker } from '@faker-js/faker';
import {
  CreateAppointmentDto,
  UpdateAppointmentDto,
  AppointmentStatus,
  AppointmentDto,
} from '../../../src/appointments/dto/appointment.dto';

export const CreateAppointmentMock = (
  overrides: UpdateAppointmentDto = {},
): CreateAppointmentDto => ({
  doctorId: faker.string.uuid(),
  patientId: faker.string.uuid(),
  datetime: faker.date.future(),
  status: faker.helpers.arrayElement(Object.values(AppointmentStatus)),
  price: faker.number.int({ min: 100, max: 500 }),
  ...overrides,
});

export const UpdateAppointmentMock = (): UpdateAppointmentDto => ({
  doctorId: faker.string.uuid(),
  patientId: faker.string.uuid(),
  datetime: faker.date.future(),
  status: faker.helpers.arrayElement(Object.values(AppointmentStatus)),
  price: faker.number.int({ min: 100, max: 500 }),
});

export const AppointmentMock = (): AppointmentDto => {
  const base = CreateAppointmentMock();
  return {
    ...base,
    id: faker.string.uuid(),
  };
};

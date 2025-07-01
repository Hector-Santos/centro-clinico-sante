import { faker } from '@faker-js/faker';
import {
  CreateWeeklyScheduleDto,
  UpdateWeeklyScheduleDto,
  WeeklyScheduleStatus,
  WeeklyScheduleDto,
} from '../../src/weekly_schedules/dto/weekly_schedule.dto';

export const CreateWeeklyScheduleMock = (
  overrides: UpdateWeeklyScheduleDto = {},
): CreateWeeklyScheduleDto => ({
  doctorId: faker.string.uuid(),
  patientId: faker.string.uuid(),
  datetime: faker.date.future(),
  status: faker.helpers.arrayElement(Object.values(WeeklyScheduleStatus)),
  price: faker.number.int({ min: 100, max: 500 }),
  ...overrides,
});

export const UpdateWeeklyScheduleMock = (): UpdateWeeklyScheduleDto => ({
  doctorId: faker.string.uuid(),
  patientId: faker.string.uuid(),
  datetime: faker.date.future(),
  status: faker.helpers.arrayElement(Object.values(WeeklyScheduleStatus)),
  price: faker.number.int({ min: 100, max: 500 }),
});

export const WeeklyScheduleMock = (): WeeklyScheduleDto => {
  const base = CreateWeeklyScheduleMock();
  return {
    ...base,
    id: faker.string.uuid(),
  };
};

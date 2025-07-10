import { faker } from '@faker-js/faker';
import {
  CreateScheduleExceptionDto,
  UpdateScheduleExceptionDto,
  ScheduleExceptionDto,
} from '../../../filedump/schedule-exception/dto/schedule-exception.dto';

export const CreateScheduleExceptionMock = (
  overrides: Partial<CreateScheduleExceptionDto> = {},
): CreateScheduleExceptionDto => ({
  originalDate: faker.date.future(),
  newDate: faker.datatype.boolean() ? faker.date.future() : undefined,
  newTimes: faker.datatype.boolean() ? ['09:00', '10:00'] : undefined,
  durationInWeeks: faker.datatype.boolean()
    ? faker.number.int({ min: 1, max: 4 })
    : undefined,
  doctorId: faker.datatype.boolean() ? faker.string.uuid() : undefined,
  ...overrides,
});

export const UpdateScheduleExceptionMock = (): UpdateScheduleExceptionDto => ({
  ...CreateScheduleExceptionMock(),
});

export const ScheduleExceptionMock = (): ScheduleExceptionDto => ({
  ...CreateScheduleExceptionMock(),
  id: faker.string.uuid(),
});

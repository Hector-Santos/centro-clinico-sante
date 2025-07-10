"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduleExceptionMock = exports.UpdateScheduleExceptionMock = exports.CreateScheduleExceptionMock = void 0;
const faker_1 = require("@faker-js/faker");
const CreateScheduleExceptionMock = (overrides = {}) => ({
    originalDate: faker_1.faker.date.future(),
    newDate: faker_1.faker.datatype.boolean() ? faker_1.faker.date.future() : undefined,
    newTimes: faker_1.faker.datatype.boolean() ? ['09:00', '10:00'] : undefined,
    durationInWeeks: faker_1.faker.datatype.boolean()
        ? faker_1.faker.number.int({ min: 1, max: 4 })
        : undefined,
    doctorId: faker_1.faker.datatype.boolean() ? faker_1.faker.string.uuid() : undefined,
    ...overrides,
});
exports.CreateScheduleExceptionMock = CreateScheduleExceptionMock;
const UpdateScheduleExceptionMock = () => ({
    ...(0, exports.CreateScheduleExceptionMock)(),
});
exports.UpdateScheduleExceptionMock = UpdateScheduleExceptionMock;
const ScheduleExceptionMock = () => ({
    ...(0, exports.CreateScheduleExceptionMock)(),
    id: faker_1.faker.string.uuid(),
});
exports.ScheduleExceptionMock = ScheduleExceptionMock;
//# sourceMappingURL=schedule-exception.factory.js.map
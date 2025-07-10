"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeeklyScheduleMock = exports.UpdateWeeklyScheduleMock = exports.CreateWeeklyScheduleMock = void 0;
const faker_1 = require("@faker-js/faker");
const weekly_schedule_dto_1 = require("../../src/weekly_schedules/dto/weekly_schedule.dto");
const CreateWeeklyScheduleMock = (overrides = {}) => ({
    doctorId: faker_1.faker.string.uuid(),
    patientId: faker_1.faker.string.uuid(),
    datetime: faker_1.faker.date.future(),
    status: faker_1.faker.helpers.arrayElement(Object.values(weekly_schedule_dto_1.WeeklyScheduleStatus)),
    price: faker_1.faker.number.int({ min: 100, max: 500 }),
    ...overrides,
});
exports.CreateWeeklyScheduleMock = CreateWeeklyScheduleMock;
const UpdateWeeklyScheduleMock = () => ({
    doctorId: faker_1.faker.string.uuid(),
    patientId: faker_1.faker.string.uuid(),
    datetime: faker_1.faker.date.future(),
    status: faker_1.faker.helpers.arrayElement(Object.values(weekly_schedule_dto_1.WeeklyScheduleStatus)),
    price: faker_1.faker.number.int({ min: 100, max: 500 }),
});
exports.UpdateWeeklyScheduleMock = UpdateWeeklyScheduleMock;
const WeeklyScheduleMock = () => {
    const base = (0, exports.CreateWeeklyScheduleMock)();
    return {
        ...base,
        id: faker_1.faker.string.uuid(),
    };
};
exports.WeeklyScheduleMock = WeeklyScheduleMock;
//# sourceMappingURL=weekly-schedule.factory.js.map
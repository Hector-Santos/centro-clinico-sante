"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentMock = exports.UpdateAppointmentMock = exports.CreateAppointmentMock = void 0;
const faker_1 = require("@faker-js/faker");
const appointment_dto_1 = require("../../../src/appointments/dto/appointment.dto");
const CreateAppointmentMock = (overrides = {}) => ({
    doctorId: faker_1.faker.string.uuid(),
    patientId: faker_1.faker.string.uuid(),
    datetime: faker_1.faker.date.future(),
    status: faker_1.faker.helpers.arrayElement(Object.values(appointment_dto_1.AppointmentStatus)),
    price: faker_1.faker.number.int({ min: 100, max: 500 }),
    ...overrides,
});
exports.CreateAppointmentMock = CreateAppointmentMock;
const UpdateAppointmentMock = () => ({
    doctorId: faker_1.faker.string.uuid(),
    patientId: faker_1.faker.string.uuid(),
    datetime: faker_1.faker.date.future(),
    status: faker_1.faker.helpers.arrayElement(Object.values(appointment_dto_1.AppointmentStatus)),
    price: faker_1.faker.number.int({ min: 100, max: 500 }),
});
exports.UpdateAppointmentMock = UpdateAppointmentMock;
const AppointmentMock = () => {
    const base = (0, exports.CreateAppointmentMock)();
    return {
        ...base,
        id: faker_1.faker.string.uuid(),
    };
};
exports.AppointmentMock = AppointmentMock;
//# sourceMappingURL=appointment.factory.js.map
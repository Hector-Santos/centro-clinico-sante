"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientMock = exports.UpdatePatientMock = exports.CreatePatientMock = void 0;
const faker_1 = require("@faker-js/faker");
const utils_factory_1 = require("./utils.factory");
const CreatePatientMock = (overrides = {}) => ({
    name: faker_1.faker.person.fullName(),
    phone: (0, utils_factory_1.generateWhatsAppNumber)(),
    ...overrides,
});
exports.CreatePatientMock = CreatePatientMock;
const UpdatePatientMock = () => ({
    ...(0, exports.CreatePatientMock)(),
});
exports.UpdatePatientMock = UpdatePatientMock;
const PatientMock = () => {
    const base = (0, exports.CreatePatientMock)();
    return {
        ...base,
        id: faker_1.faker.string.uuid(),
        doctorId: faker_1.faker.string.uuid(),
    };
};
exports.PatientMock = PatientMock;
//# sourceMappingURL=patient.factory.js.map
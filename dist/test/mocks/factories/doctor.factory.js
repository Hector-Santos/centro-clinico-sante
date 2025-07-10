"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorMock = exports.UpdateDoctorMock = exports.CreateDoctorMock = void 0;
const faker_1 = require("@faker-js/faker");
const utils_factory_1 = require("./utils.factory");
const CreateDoctorMock = (overrides = {}) => ({
    name: faker_1.faker.person.fullName(),
    phone: (0, utils_factory_1.generateWhatsAppNumber)(),
    ...overrides,
});
exports.CreateDoctorMock = CreateDoctorMock;
const UpdateDoctorMock = () => ({
    ...(0, exports.CreateDoctorMock)(),
});
exports.UpdateDoctorMock = UpdateDoctorMock;
const DoctorMock = () => {
    const base = (0, exports.CreateDoctorMock)();
    return {
        ...base,
        id: faker_1.faker.string.uuid(),
    };
};
exports.DoctorMock = DoctorMock;
//# sourceMappingURL=doctor.factory.js.map
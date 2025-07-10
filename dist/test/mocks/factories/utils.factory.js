"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateWhatsAppNumber = void 0;
const faker_1 = require("@faker-js/faker");
const generateWhatsAppNumber = () => {
    const totalDigits = faker_1.faker.number.int({ min: 10, max: 15 });
    const first = faker_1.faker.string.numeric({ length: 1, exclude: ['0'] });
    const rest = faker_1.faker.string.numeric(totalDigits - 1);
    return `+${first}${rest}`;
};
exports.generateWhatsAppNumber = generateWhatsAppNumber;
//# sourceMappingURL=utils.factory.js.map
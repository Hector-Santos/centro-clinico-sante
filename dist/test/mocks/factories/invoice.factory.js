"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceMock = exports.UpdateInvoiceMock = exports.CreateInvoiceMock = void 0;
const faker_1 = require("@faker-js/faker");
const invoice_dto_1 = require("../../../src/invoice/dto/invoice.dto");
const CreateInvoiceMock = (overrides = {}) => ({
    patientId: faker_1.faker.string.uuid(),
    referenceMonth: faker_1.faker.date.month({ abbreviated: false }) + '/2025',
    status: faker_1.faker.helpers.arrayElement(Object.values(invoice_dto_1.InvoiceStatus)),
    createdAt: faker_1.faker.date.recent(),
    dueDate: faker_1.faker.date.soon(),
    txid: faker_1.faker.string.alphanumeric(16),
    qrCode: faker_1.faker.internet.url(),
    paidAt: faker_1.faker.datatype.boolean() ? faker_1.faker.date.recent() : null,
    ...overrides,
});
exports.CreateInvoiceMock = CreateInvoiceMock;
const UpdateInvoiceMock = () => ({
    ...(0, exports.CreateInvoiceMock)(),
});
exports.UpdateInvoiceMock = UpdateInvoiceMock;
const InvoiceMock = () => {
    const base = (0, exports.CreateInvoiceMock)();
    return {
        ...base,
        id: faker_1.faker.string.uuid(),
    };
};
exports.InvoiceMock = InvoiceMock;
//# sourceMappingURL=invoice.factory.js.map
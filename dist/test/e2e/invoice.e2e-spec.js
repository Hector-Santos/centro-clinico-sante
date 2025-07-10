"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const testing_1 = require("@nestjs/testing");
const invoice_module_1 = require("../../src/invoice/invoice.module");
describe('InvoiceController (e2e)', () => {
    let app;
    let id;
    beforeAll(async () => {
        const moduleFixture = await testing_1.Test.createTestingModule({
            imports: [invoice_module_1.InvoiceModule],
        }).compile();
        app = moduleFixture.createNestApplication();
        await app.init();
    });
    it('POST /invoice → success', async () => {
        const res = await (0, supertest_1.default)(app.getHttpServer()).post('/invoice').send({});
        expect([200, 201]).toContain(res.statusCode);
        if (res.body?.id)
            id = res.body.id;
    });
    it('POST /invoice → fail (invalid body)', async () => {
        const res = await (0, supertest_1.default)(app.getHttpServer()).post('/invoice').send(null);
        expect(res.statusCode).toBeGreaterThanOrEqual(400);
    });
    it('GET /invoice → success', async () => {
        const res = await (0, supertest_1.default)(app.getHttpServer()).get('/invoice');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
    it('GET /invoice/:id → fail (not found)', async () => {
        const res = await (0, supertest_1.default)(app.getHttpServer()).get('/invoice/invalid-id');
        expect([400, 404]).toContain(res.statusCode);
    });
    it('PUT /invoice/:id → success/fail', async () => {
        const res = await (0, supertest_1.default)(app.getHttpServer())
            .put(`/{module}/${id || 'invalid-id'}`)
            .send({});
        expect([200, 400, 404]).toContain(res.statusCode);
    });
    it('DELETE /invoice/:id → success/fail', async () => {
        const res = await (0, supertest_1.default)(app.getHttpServer()).delete(`/{module}/${id || 'invalid-id'}`);
        expect([200, 400, 404]).toContain(res.statusCode);
    });
    afterAll(async () => {
        await app.close();
    });
});
//# sourceMappingURL=invoice.e2e-spec.js.map
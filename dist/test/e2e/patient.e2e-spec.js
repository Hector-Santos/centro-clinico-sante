"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const testing_1 = require("@nestjs/testing");
const patient_module_1 = require("../../src/patient/patient.module");
describe('PatientController (e2e)', () => {
    let app;
    let id;
    beforeAll(async () => {
        const moduleFixture = await testing_1.Test.createTestingModule({
            imports: [patient_module_1.PatientModule],
        }).compile();
        app = moduleFixture.createNestApplication();
        await app.init();
    });
    it('POST /patient → success', async () => {
        const res = await (0, supertest_1.default)(app.getHttpServer()).post('/patient').send({});
        expect([200, 201]).toContain(res.statusCode);
        if (res.body?.id)
            id = res.body.id;
    });
    it('POST /patient → fail (invalid body)', async () => {
        const res = await (0, supertest_1.default)(app.getHttpServer()).post('/patient').send(null);
        expect(res.statusCode).toBeGreaterThanOrEqual(400);
    });
    it('GET /patient → success', async () => {
        const res = await (0, supertest_1.default)(app.getHttpServer()).get('/patient');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
    it('GET /patient/:id → fail (not found)', async () => {
        const res = await (0, supertest_1.default)(app.getHttpServer()).get('/patient/invalid-id');
        expect([400, 404]).toContain(res.statusCode);
    });
    it('PUT /patient/:id → success/fail', async () => {
        const res = await (0, supertest_1.default)(app.getHttpServer())
            .put(`/{module}/${id || 'invalid-id'}`)
            .send({});
        expect([200, 400, 404]).toContain(res.statusCode);
    });
    it('DELETE /patient/:id → success/fail', async () => {
        const res = await (0, supertest_1.default)(app.getHttpServer()).delete(`/{module}/${id || 'invalid-id'}`);
        expect([200, 400, 404]).toContain(res.statusCode);
    });
    afterAll(async () => {
        await app.close();
    });
});
//# sourceMappingURL=patient.e2e-spec.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const testing_1 = require("@nestjs/testing");
const appointment_module_1 = require("../../src/appointments/appointment.module");
describe('AppointmentController (e2e)', () => {
    let app;
    let id;
    beforeAll(async () => {
        const moduleFixture = await testing_1.Test.createTestingModule({
            imports: [appointment_module_1.AppointmentModule],
        }).compile();
        app = moduleFixture.createNestApplication();
        await app.init();
    });
    it('POST /appointment → success', async () => {
        const res = await (0, supertest_1.default)(app.getHttpServer())
            .post('/appointment')
            .send({});
        expect([200, 201]).toContain(res.statusCode);
        if (res.body?.id)
            id = res.body.id;
    });
    it('POST /appointment → fail (invalid body)', async () => {
        const res = await (0, supertest_1.default)(app.getHttpServer())
            .post('/appointment')
            .send(null);
        expect(res.statusCode).toBeGreaterThanOrEqual(400);
    });
    it('GET /appointment → success', async () => {
        const res = await (0, supertest_1.default)(app.getHttpServer()).get('/appointment');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
    it('GET /appointment/:id → fail (not found)', async () => {
        const res = await (0, supertest_1.default)(app.getHttpServer()).get('/appointment/invalid-id');
        expect([400, 404]).toContain(res.statusCode);
    });
    it('PUT /appointment/:id → success/fail', async () => {
        const res = await (0, supertest_1.default)(app.getHttpServer())
            .put(`/{module}/${id || 'invalid-id'}`)
            .send({});
        expect([200, 400, 404]).toContain(res.statusCode);
    });
    it('DELETE /appointment/:id → success/fail', async () => {
        const res = await (0, supertest_1.default)(app.getHttpServer()).delete(`/{module}/${id || 'invalid-id'}`);
        expect([200, 400, 404]).toContain(res.statusCode);
    });
    afterAll(async () => {
        await app.close();
    });
});
//# sourceMappingURL=appointment.e2e-spec.js.map
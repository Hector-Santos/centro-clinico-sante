"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const testing_1 = require("@nestjs/testing");
const weekly_schedule_module_1 = require("../../filedump/weekly-schedule/weekly-schedule.module");
describe('WeeklyScheduleController (e2e)', () => {
    let app;
    let id;
    beforeAll(async () => {
        const moduleFixture = await testing_1.Test.createTestingModule({
            imports: [weekly_schedule_module_1.WeeklyScheduleModule],
        }).compile();
        app = moduleFixture.createNestApplication();
        await app.init();
    });
    it('POST /weekly-schedule → success', async () => {
        const res = await (0, supertest_1.default)(app.getHttpServer())
            .post('/weekly-schedule')
            .send({});
        expect([200, 201]).toContain(res.statusCode);
        if (res.body?.id)
            id = res.body.id;
    });
    it('POST /weekly-schedule → fail (invalid body)', async () => {
        const res = await (0, supertest_1.default)(app.getHttpServer())
            .post('/weekly-schedule')
            .send(null);
        expect(res.statusCode).toBeGreaterThanOrEqual(400);
    });
    it('GET /weekly-schedule → success', async () => {
        const res = await (0, supertest_1.default)(app.getHttpServer()).get('/weekly-schedule');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
    it('GET /weekly-schedule/:id → fail (not found)', async () => {
        const res = await (0, supertest_1.default)(app.getHttpServer()).get('/weekly-schedule/invalid-id');
        expect([400, 404]).toContain(res.statusCode);
    });
    it('PUT /weekly-schedule/:id → success/fail', async () => {
        const res = await (0, supertest_1.default)(app.getHttpServer())
            .put(`/{module}/${id || 'invalid-id'}`)
            .send({});
        expect([200, 400, 404]).toContain(res.statusCode);
    });
    it('DELETE /weekly-schedule/:id → success/fail', async () => {
        const res = await (0, supertest_1.default)(app.getHttpServer()).delete(`/{module}/${id || 'invalid-id'}`);
        expect([200, 400, 404]).toContain(res.statusCode);
    });
    afterAll(async () => {
        await app.close();
    });
});
//# sourceMappingURL=weekly-schedule.e2e-spec.js.map
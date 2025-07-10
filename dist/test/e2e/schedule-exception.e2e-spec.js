"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const testing_1 = require("@nestjs/testing");
const schedule_exception_module_1 = require("../../filedump/schedule-exception/schedule-exception.module");
describe('ScheduleExceptionController (e2e)', () => {
    let app;
    let id;
    beforeAll(async () => {
        const moduleFixture = await testing_1.Test.createTestingModule({
            imports: [schedule_exception_module_1.ScheduleExceptionModule],
        }).compile();
        app = moduleFixture.createNestApplication();
        await app.init();
    });
    it('POST /schedule-exception → success', async () => {
        const res = await (0, supertest_1.default)(app.getHttpServer())
            .post('/schedule-exception')
            .send({});
        expect([200, 201]).toContain(res.statusCode);
        if (res.body?.id)
            id = res.body.id;
    });
    it('POST /schedule-exception → fail (invalid body)', async () => {
        const res = await (0, supertest_1.default)(app.getHttpServer())
            .post('/schedule-exception')
            .send(null);
        expect(res.statusCode).toBeGreaterThanOrEqual(400);
    });
    it('GET /schedule-exception → success', async () => {
        const res = await (0, supertest_1.default)(app.getHttpServer()).get('/schedule-exception');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
    it('GET /schedule-exception/:id → fail (not found)', async () => {
        const res = await (0, supertest_1.default)(app.getHttpServer()).get('/schedule-exception/invalid-id');
        expect([400, 404]).toContain(res.statusCode);
    });
    it('PUT /schedule-exception/:id → success/fail', async () => {
        const res = await (0, supertest_1.default)(app.getHttpServer())
            .put(`/{module}/${id || 'invalid-id'}`)
            .send({});
        expect([200, 400, 404]).toContain(res.statusCode);
    });
    it('DELETE /schedule-exception/:id → success/fail', async () => {
        const res = await (0, supertest_1.default)(app.getHttpServer()).delete(`/{module}/${id || 'invalid-id'}`);
        expect([200, 400, 404]).toContain(res.statusCode);
    });
    afterAll(async () => {
        await app.close();
    });
});
//# sourceMappingURL=schedule-exception.e2e-spec.js.map
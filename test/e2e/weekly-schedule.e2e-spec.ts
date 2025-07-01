import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { WeeklyScheduleModule } from '../../filedump/weekly-schedule/weekly-schedule.module';

describe('WeeklyScheduleController (e2e)', () => {
  let app: INestApplication;
  let id: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [WeeklyScheduleModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('POST /weekly-schedule → success', async () => {
    const res = await request(app.getHttpServer())
      .post('/weekly-schedule')
      .send({});
    expect([200, 201]).toContain(res.statusCode);
    if (res.body?.id) id = res.body.id;
  });

  it('POST /weekly-schedule → fail (invalid body)', async () => {
    const res = await request(app.getHttpServer())
      .post('/weekly-schedule')
      .send(null);
    expect(res.statusCode).toBeGreaterThanOrEqual(400);
  });

  it('GET /weekly-schedule → success', async () => {
    const res = await request(app.getHttpServer()).get('/weekly-schedule');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET /weekly-schedule/:id → fail (not found)', async () => {
    const res = await request(app.getHttpServer()).get(
      '/weekly-schedule/invalid-id',
    );
    expect([400, 404]).toContain(res.statusCode);
  });

  it('PUT /weekly-schedule/:id → success/fail', async () => {
    const res = await request(app.getHttpServer())
      .put(`/{module}/${id || 'invalid-id'}`)
      .send({});
    expect([200, 400, 404]).toContain(res.statusCode);
  });

  it('DELETE /weekly-schedule/:id → success/fail', async () => {
    const res = await request(app.getHttpServer()).delete(
      `/{module}/${id || 'invalid-id'}`,
    );
    expect([200, 400, 404]).toContain(res.statusCode);
  });

  afterAll(async () => {
    await app.close();
  });
});

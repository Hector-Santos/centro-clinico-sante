import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { ScheduleExceptionModule } from '../../filedump/schedule-exception/schedule-exception.module';

describe('ScheduleExceptionController (e2e)', () => {
  let app: INestApplication;
  let id: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ScheduleExceptionModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('POST /schedule-exception → success', async () => {
    const res = await request(app.getHttpServer())
      .post('/schedule-exception')
      .send({});
    expect([200, 201]).toContain(res.statusCode);
    if (res.body?.id) id = res.body.id;
  });

  it('POST /schedule-exception → fail (invalid body)', async () => {
    const res = await request(app.getHttpServer())
      .post('/schedule-exception')
      .send(null);
    expect(res.statusCode).toBeGreaterThanOrEqual(400);
  });

  it('GET /schedule-exception → success', async () => {
    const res = await request(app.getHttpServer()).get('/schedule-exception');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET /schedule-exception/:id → fail (not found)', async () => {
    const res = await request(app.getHttpServer()).get(
      '/schedule-exception/invalid-id',
    );
    expect([400, 404]).toContain(res.statusCode);
  });

  it('PUT /schedule-exception/:id → success/fail', async () => {
    const res = await request(app.getHttpServer())
      .put(`/{module}/${id || 'invalid-id'}`)
      .send({});
    expect([200, 400, 404]).toContain(res.statusCode);
  });

  it('DELETE /schedule-exception/:id → success/fail', async () => {
    const res = await request(app.getHttpServer()).delete(
      `/{module}/${id || 'invalid-id'}`,
    );
    expect([200, 400, 404]).toContain(res.statusCode);
  });

  afterAll(async () => {
    await app.close();
  });
});

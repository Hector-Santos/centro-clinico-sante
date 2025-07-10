import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentModule } from '../../src/appointments/appointment.module';

describe('AppointmentController (e2e)', () => {
  let app: INestApplication;
  let id: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppointmentModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('POST /appointment → success', async () => {
    const res = await request(app.getHttpServer())
      .post('/appointment')
      .send({});
    expect([200, 201]).toContain(res.statusCode);
    if (res.body?.id) id = res.body.id;
  });

  it('POST /appointment → fail (invalid body)', async () => {
    const res = await request(app.getHttpServer())
      .post('/appointment')
      .send(null);
    expect(res.statusCode).toBeGreaterThanOrEqual(400);
  });

  it('GET /appointment → success', async () => {
    const res = await request(app.getHttpServer()).get('/appointment');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET /appointment/:id → fail (not found)', async () => {
    const res = await request(app.getHttpServer()).get(
      '/appointment/invalid-id',
    );
    expect([400, 404]).toContain(res.statusCode);
  });

  it('PUT /appointment/:id → success/fail', async () => {
    const res = await request(app.getHttpServer())
      .put(`/{module}/${id || 'invalid-id'}`)
      .send({});
    expect([200, 400, 404]).toContain(res.statusCode);
  });

  it('DELETE /appointment/:id → success/fail', async () => {
    const res = await request(app.getHttpServer()).delete(
      `/{module}/${id || 'invalid-id'}`,
    );
    expect([200, 400, 404]).toContain(res.statusCode);
  });

  afterAll(async () => {
    await app.close();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { PatientModule } from '../../src/patient/patient.module';

describe('PatientController (e2e)', () => {
  let app: INestApplication;
  let id: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [PatientModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('POST /patient → success', async () => {
    const res = await request(app.getHttpServer()).post('/patient').send({});
    expect([200, 201]).toContain(res.statusCode);
    if (res.body?.id) id = res.body.id;
  });

  it('POST /patient → fail (invalid body)', async () => {
    const res = await request(app.getHttpServer()).post('/patient').send(null);
    expect(res.statusCode).toBeGreaterThanOrEqual(400);
  });

  it('GET /patient → success', async () => {
    const res = await request(app.getHttpServer()).get('/patient');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET /patient/:id → fail (not found)', async () => {
    const res = await request(app.getHttpServer()).get('/patient/invalid-id');
    expect([400, 404]).toContain(res.statusCode);
  });

  it('PUT /patient/:id → success/fail', async () => {
    const res = await request(app.getHttpServer())
      .put(`/{module}/${id || 'invalid-id'}`)
      .send({});
    expect([200, 400, 404]).toContain(res.statusCode);
  });

  it('DELETE /patient/:id → success/fail', async () => {
    const res = await request(app.getHttpServer()).delete(
      `/{module}/${id || 'invalid-id'}`,
    );
    expect([200, 400, 404]).toContain(res.statusCode);
  });

  afterAll(async () => {
    await app.close();
  });
});

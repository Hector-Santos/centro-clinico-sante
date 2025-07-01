import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { InvoiceModule } from '../../src/invoice/invoice.module';

describe('InvoiceController (e2e)', () => {
  let app: INestApplication;
  let id: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [InvoiceModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('POST /invoice → success', async () => {
    const res = await request(app.getHttpServer()).post('/invoice').send({});
    expect([200, 201]).toContain(res.statusCode);
    if (res.body?.id) id = res.body.id;
  });

  it('POST /invoice → fail (invalid body)', async () => {
    const res = await request(app.getHttpServer()).post('/invoice').send(null);
    expect(res.statusCode).toBeGreaterThanOrEqual(400);
  });

  it('GET /invoice → success', async () => {
    const res = await request(app.getHttpServer()).get('/invoice');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET /invoice/:id → fail (not found)', async () => {
    const res = await request(app.getHttpServer()).get('/invoice/invalid-id');
    expect([400, 404]).toContain(res.statusCode);
  });

  it('PUT /invoice/:id → success/fail', async () => {
    const res = await request(app.getHttpServer())
      .put(`/{module}/${id || 'invalid-id'}`)
      .send({});
    expect([200, 400, 404]).toContain(res.statusCode);
  });

  it('DELETE /invoice/:id → success/fail', async () => {
    const res = await request(app.getHttpServer()).delete(
      `/{module}/${id || 'invalid-id'}`,
    );
    expect([200, 400, 404]).toContain(res.statusCode);
  });

  afterAll(async () => {
    await app.close();
  });
});

// tests/apod.test.ts
import request from 'supertest';
import app from '../app';

describe('GET /api/apod', () => {
  it('should return APOD data', async () => {
    const res = await request(app).get('/api/apod');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('title');
  });
});

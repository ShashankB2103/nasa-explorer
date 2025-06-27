// src/tests/epic.test.ts

import request from 'supertest';
import app from '../app';

describe('EPIC API', () => {
  it('should return an array of EPIC images', async () => {
    const res = await request(app).get('/api/epic');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);

    if (res.body.length > 0) {
      const sample = res.body[0];
      expect(sample).toHaveProperty('imgUrl');
      expect(sample).toHaveProperty('caption');
      expect(sample).toHaveProperty('date');
    }
  }, 10000); // extended timeout for NASA API
});

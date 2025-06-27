// src/tests/neo.test.ts

import request from 'supertest';
import app from '../app';

describe('NEO (Near-Earth Object) API', () => {
  it('should return NEO data for today', async () => {
    const today = new Date().toISOString().split('T')[0];
    const res = await request(app).get(`/api/neo?start=${today}&end=${today}`);

    expect(res.statusCode).toBe(200);
    expect(typeof res.body).toBe('object');

    // Flatten objects and check a sample NEO
    const allNeos = Object.values(res.body).flat();
    if (allNeos.length > 0) {
      const sample = allNeos[0];
      expect(sample).toHaveProperty('id');
      expect(sample).toHaveProperty('name');
      expect(sample).toHaveProperty('estimated_diameter');
    }
  }, 10000); // Extended timeout for external API
});

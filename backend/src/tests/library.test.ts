// src/tests/library.test.ts

import request from 'supertest';
import app from '../app';

describe('NASA Image and Video Library API', () => {
  it('should return a list of media results for a valid search query', async () => {
    const res = await request(app).get('/api/library?search=moon');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);

    if (res.body.length > 0) {
      const item = res.body[0];
      expect(item).toHaveProperty('title');
      expect(item).toHaveProperty('description');
      expect(item).toHaveProperty('date_created');
      expect(item).toHaveProperty('imageUrl');
    }
  }, 10000); // allow extra time for external API
});
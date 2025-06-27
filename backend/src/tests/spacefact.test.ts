// src/tests/spaceFact.test.ts

import request from 'supertest';
import app from '../app';

describe('Space Fact Generator API', () => {
  it('should return a fun space fact', async () => {
    const res = await request(app).get('/api/space-fact');

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('fact');
    expect(typeof res.body.fact).toBe('string');
    expect(res.body.fact.length).toBeGreaterThan(10); // check if it's not an empty fact
  }, 10000); // Extended timeout due to external OpenAI API
});

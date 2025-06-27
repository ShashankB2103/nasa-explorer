// src/tests/mars.test.ts

import request from 'supertest';
import app from '../app';

describe('Mars Rover API', () => {
  it('should return photos for curiosity rover on sol 1000', async () => {
    const res = await request(app).get('/api/mars?rover=curiosity&sol=1000');
    
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);

    // If the response is not empty, validate the photo structure
    if (res.body.length > 0) {
      const photo = res.body[0];
      expect(photo).toHaveProperty('img_src');
      expect(photo).toHaveProperty('camera');
      expect(photo.camera).toHaveProperty('full_name');
    }
  }, 10000); // extend timeout to 10 seconds for external API
});

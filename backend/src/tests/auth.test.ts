import request from 'supertest';
import mongoose from 'mongoose';
import app from '../app'; // Make sure you export your Express app from app.ts
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

describe('Auth Routes', () => {
  // Connect to test DB before running tests
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI || '', {
      dbName: 'nasa-explorer-test',
    });
  });

  // Disconnect after tests
  afterAll(async () => {
    await mongoose.connection.dropDatabase(); // optional: cleanup
    await mongoose.connection.close();
  });

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        email: `testuser${Date.now()}@example.com`, // unique email
        password: 'testpassword123',
      });

    expect(res.status).toBe(201);
    expect(res.body.message).toBe('User registered successfully');
  }, 10000); // Increase timeout to 10s

  it('should login a registered user', async () => {
    const email = `testuser${Date.now()}@example.com`;

    // Register first
    await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test Login',
        email,
        password: 'loginpass123',
      });

    // Then login
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email,
        password: 'loginpass123',
      });

    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
    expect(res.body.user).toHaveProperty('email', email);
  }, 10000);
});

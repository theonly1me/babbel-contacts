import request from 'supertest';
import app from '../../app.js';
import { expect } from 'chai';
import { it, describe } from 'mocha';

describe('Policies', () => {
  describe('authenticateUser', () => {
    beforeEach(() => {
      process.env.USERNAME = 'test';
      process.env.PASSWORD = 'test';
    });

    afterEach(() => {
      delete process.env.USERNAME;
      delete process.env.PASSWORD;
    });

    it('should respond with 401 if authorization header is not present', async () => {
      const response = await request(app).post('/contacts').send().expect(401);

      expect(response.body).eql({
        title: 'Authentication required.',
        type: 'UNAUTHORIZED',
        status: 401,
      });
    });

    it('should respond with 401 if authorization header contains invalid credentials', async () => {
      const response = await request(app)
        .post('/contacts')
        .send()
        .set('Authorization', 'Basic abc')
        .expect(401);

      expect(response.body).eql({
        title: 'Authentication required.',
        type: 'UNAUTHORIZED',
        status: 401,
      });
    });
  });
});

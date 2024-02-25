import request from 'supertest';
import app from '../../app.js';
import { expect } from 'chai';
import { it, describe } from 'mocha';

describe('HealthController', () => {
  it('should successfully perform health check', async function () {
    const response = await request(app)
      .get('/knockknock')
      .expect('Content-Type', /text/)
      .expect(200);

    expect(response.text).equal("who's there?");
  });
});

import request from 'supertest';
import app from '../../app.js';
import { expect } from 'chai';
import { it, describe } from 'mocha';
import sinon from 'sinon';
import contactsModel from '../../models/ContactsModel.js';

describe('ContactsController', () => {
  beforeEach(() => {
    process.env.USERNAME = 'test';
    process.env.PASSWORD = 'test';
  });

  afterEach(() => {
    delete process.env.USERNAME;
    delete process.env.PASSWORD;
  });

  describe('Validations', () => {
    it('should respond with 400 Bad Request if name is not present in the request body', async () => {
      const response = await request(app)
        .post('/contacts')
        .send()
        .set(
          'Authorization',
          `Basic ${Buffer.from('test:test', 'binary').toString('base64')}`
        )
        .expect(400);

      expect(response.body).eql({
        title: 'The name specified is invalid',
        detail: "Name should be in the format: 'Firstname Lastname'.",
        type: 'BAD_REQUEST',
        status: 400,
      });
    });

    it('should respond with 400 Bad Request if name is present but invalid', async () => {
      const response = await request(app)
        .post('/contacts')
        .send({ name: 'Atchyut' })
        .set(
          'Authorization',
          `Basic ${Buffer.from('test:test', 'binary').toString('base64')}`
        )
        .expect(400);

      expect(response.body).eql({
        title: 'The name specified is invalid',
        detail: "Name should be in the format: 'Firstname Lastname'.",
        type: 'BAD_REQUEST',
        status: 400,
      });
    });

    it('should respond with 400 Bad Request if domain is not present in the request body', async () => {
      const response = await request(app)
        .post('/contacts')
        .send({ name: 'Atchyut Pulavarthi' })
        .set(
          'Authorization',
          `Basic ${Buffer.from('test:test', 'binary').toString('base64')}`
        )
        .expect(400);

      expect(response.body).eql({
        title: 'The domain specified is invalid',
        detail: "Domain should be in the format: 'domain.TLD'.",
        type: 'BAD_REQUEST',
        status: 400,
      });
    });

    it('should respond with 400 Bad Request if domain is present but invalid', async () => {
      const response = await request(app)
        .post('/contacts')
        .send({ name: 'Atchyut Pulavarthi', domain: 'invalid-domain' })
        .set(
          'Authorization',
          `Basic ${Buffer.from('test:test', 'binary').toString('base64')}`
        )
        .expect(400);

      expect(response.body).eql({
        title: 'The domain specified is invalid',
        detail: "Domain should be in the format: 'domain.TLD'.",
        type: 'BAD_REQUEST',
        status: 400,
      });
    });

    it('should respond with 400 Bad Request if domain contains @', async () => {
      const response = await request(app)
        .post('/contacts')
        .send({
          name: 'Atchyut Pulavarthi',
          domain: '@atchyut.dev',
        })
        .set(
          'Authorization',
          `Basic ${Buffer.from('test:test', 'binary').toString('base64')}`
        )
        .expect(400);

      expect(response.body).eql({
        title: 'The domain specified is invalid',
        detail: "Domain should be in the format: 'domain.TLD'.",
        type: 'BAD_REQUEST',
        status: 400,
      });
    });

    it('should respond with 400 Bad Request if onboard flag is present but is not boolean', async () => {
      const response = await request(app)
        .post('/contacts')
        .send({
          name: 'Atchyut Pulavarthi',
          domain: 'atchyut.dev',
          onboard: 1,
        })
        .set(
          'Authorization',
          `Basic ${Buffer.from('test:test', 'binary').toString('base64')}`
        )
        .expect(400);

      expect(response.body).eql({
        title: 'The onboard flag is invalid',
        detail:
          "The onboard flag must be one of 'true' or 'false' and will be ignored if user's organization is already onboarded.",
        type: 'BAD_REQUEST',
        status: 400,
      });
    });
  });

  describe('Get Contact Details', () => {
    beforeEach(() => {
      contactsModel.findOneContact = sinon.stub().returns({
        name: 'Atchyut Pulavarthi',
        email: 'atchyutpulavarthi@atchyut.dev',
      });
    });

    afterEach(() => {
      sinon.restore();
    });

    it('should return contact details, if contact exists', async () => {
      const response = await request(app)
        .post('/contacts')
        .send({
          name: 'Atchyut Pulavarthi',
          domain: 'atchyut.dev',
        })
        .set(
          'Authorization',
          `Basic ${Buffer.from('test:test', 'binary').toString('base64')}`
        )
        .expect(200);

      expect(response.body).eql({
        name: 'Atchyut Pulavarthi',
        email: 'atchyutpulavarthi@atchyut.dev',
      });
    });
  });

  describe('Create Contact', () => {
    beforeEach(() => {
      contactsModel.findOneContact = sinon.stub().returns(null);
      contactsModel.createContact = sinon.stub().returns({
        name: 'Harry Potter',
        email: 'harrypotter@atchyut.dev',
      });
      contactsModel.findExistingContact = sinon.stub().returns({
        name: 'Atchyut Pulavarthi',
        email: 'atchyutpulavarthi@atchyut.dev',
      });
    });

    afterEach(() => {
      sinon.restore();
    });

    it('should return contact details, if contact exists', async () => {
      const response = await request(app)
        .post('/contacts')
        .send({
          name: 'Harry Potter',
          domain: 'atchyut.dev',
        })
        .set(
          'Authorization',
          `Basic ${Buffer.from('test:test', 'binary').toString('base64')}`
        )
        .expect(201);

      expect(response.body).eql({
        name: 'Harry Potter',
        email: 'harrypotter@atchyut.dev',
      });
    });
  });

  describe('Onboard Organization', () => {
    beforeEach(() => {
      contactsModel.findOneContact = sinon.stub().returns(null);
      contactsModel.createContact = sinon.stub().returns({
        name: 'Harry Potter',
        email: 'harrypotter@atchyut.dev',
      });
      contactsModel.findExistingContact = sinon.stub().returns(null);
    });

    afterEach(() => {
      sinon.restore();
    });

    it('should return 400 Bad Request if onboard flag is not supplied', async () => {
      const response = await request(app)
        .post('/contacts')
        .send({
          name: 'Harry Potter',
          domain: 'atchyut.dev',
        })
        .set(
          'Authorization',
          `Basic ${Buffer.from('test:test', 'binary').toString('base64')}`
        )
        .expect(400);

      expect(response.body).eql({
        title: 'Organization not onboarded',
        detail:
          "Please send the onboard flag as 'true' to onboard organization and add contact.",
        type: 'BAD_REQUEST',
        status: 400,
      });
    });

    it('should return 400 Bad Request if onboard flag is false', async () => {
      const response = await request(app)
        .post('/contacts')
        .send({
          name: 'Harry Potter',
          domain: 'atchyut.dev',
          onboard: false,
        })
        .set(
          'Authorization',
          `Basic ${Buffer.from('test:test', 'binary').toString('base64')}`
        )
        .expect(400);

      expect(response.body).eql({
        title: 'Organization not onboarded',
        detail:
          "Please send the onboard flag as 'true' to onboard organization and add contact.",
        type: 'BAD_REQUEST',
        status: 400,
      });
    });

    it('should onboard org and create contact if onboard flag is true', async () => {
      const response = await request(app)
        .post('/contacts')
        .send({
          name: 'Harry Potter',
          domain: 'atchyut.dev',
          onboard: true,
        })
        .set(
          'Authorization',
          `Basic ${Buffer.from('test:test', 'binary').toString('base64')}`
        )
        .expect(201);

      expect(response.body).eql({
        name: 'Harry Potter',
        email: 'harrypotter@atchyut.dev',
      });
    });
  });

  describe('Derive Email - Initial', () => {
    beforeEach(() => {
      contactsModel.findOneContact = sinon.stub().returns(null);
      contactsModel.createContact = sinon.stub().returns({
        name: 'Harry Potter',
        email: 'hpotter@hogwarts.edu',
      });
      contactsModel.findExistingContact = sinon.stub().returns({
        name: 'Atchyut Pulavarthi',
        email: 'apulavarthi@hogwarts.edu',
      });
    });

    afterEach(() => {
      sinon.restore();
    });

    it('should return 400 Bad Request if onboard flag is not supplied', async () => {
      const response = await request(app)
        .post('/contacts')
        .send({
          name: 'Harry Potter',
          domain: 'hogwarts.edu',
        })
        .set(
          'Authorization',
          `Basic ${Buffer.from('test:test', 'binary').toString('base64')}`
        )
        .expect(201);

      expect(response.body).eql({
        name: 'Harry Potter',
        email: 'hpotter@hogwarts.edu',
      });
    });
  });
});

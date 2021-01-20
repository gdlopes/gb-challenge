import request from 'supertest';
import createConnection from '@database/index';

import { getConnection, Connection } from "typeorm";

import app from '../../app';

let connection: Connection;

describe('POST /sessions', () => {
  beforeAll(async () => {
    connection = await createConnection();
  });

  afterAll(async () => {
    const entities = getConnection().entityMetadatas;

    for (const entity of entities) {
      const repository = await getConnection().getRepository(entity.name);
      await repository.clear();
    }

    const myConnection = getConnection();
    await connection.close();
    await myConnection.close();
  });

  describe('when try to authenticate with valid credentials', () => {
    it('should be able to login', async () => {
      const reseller = await request(app)
        .post('/resellers')
        .send({
          name: 'Authenticate',
          document: '74024967088',
          email: 'authenticate@gmail.com',
          password: '123456'
        });

      const session = await request(app)
        .post('/sessions')
        .send({
          email: reseller.body.email,
          password: '123456'
        });

      expect(session.status).toBe(200);
      expect(session.body).toHaveProperty('reseller');
      expect(session.body).toHaveProperty('token');
    });
  });

  describe('when try to authenticate with invalid credentials', () => {
    it('should not be able to login', async () => {
      const reseller = await request(app)
        .post('/resellers')
        .send({
          name: 'Authenticate 2',
          document: '74024967088',
          email: 'authenticate2@gmail.com',
          password: '123456'
        });

      const session = await request(app)
        .post('/sessions')
        .send({
          email: reseller.body.email,
          password: 'invalid-password'
        });

      expect(session.body).toEqual(
        expect.objectContaining({
          message: 'Incorrect email or password !',
          status: 'error'
        })
      );
    });
  });
});
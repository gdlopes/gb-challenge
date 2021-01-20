import request from 'supertest';
import createConnection from '@database/index';

import { getConnection, Connection } from "typeorm";

import app from '../../app';

let connection: Connection;

describe('POST /resellers', () => {
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

  describe('when try to create a new reseller', () => {
    it('should be able create a new reseller', async () => {
      const response = await request(app)
        .post('/resellers')
        .send({
          name: 'Create Reseller',
          document: '86998094094',
          email: 'createreseller@gmail.com',
          password: '123456'
        });

      expect(response.body).toEqual(
        expect.objectContaining({
          name: 'Create Reseller',
          document: '86998094094',
          email: 'createreseller@gmail.com',
        })
      );
    });
  });

  describe('when try to create an existing reseller', () => {
    it('should not be able to create this reseller', async () => {
      await request(app)
        .post('/resellers')
        .send({
          name: 'Create Reseller 2',
          document: '61383234086',
          email: 'createreseller2@gmail.com',
          password: '123456'
        });

      const response = await request(app)
        .post('/resellers')
        .send({
          name: 'Create Reseller 2',
          document: '61383234086',
          email: 'createreseller2@gmail.com',
          password: '123456'
        });

      expect(response.body).toEqual(
        expect.objectContaining({
          message: 'Email already used.',
          status: 'error'
        })
      );
    });
  });
});
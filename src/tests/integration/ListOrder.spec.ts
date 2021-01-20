import request from 'supertest';
import createConnection from '@database/index';

import { getConnection, Connection } from "typeorm";

import app from '../../app';

let connection: Connection;

describe('GET /orders', () => {
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

  describe('when try to get orders but there is no orders created', () => {
    it('should return an empty array', async () => {
      const reseller = await request(app)
        .post('/resellers')
        .send({
          name: 'List Order Reseller',
          document: '72878069080',
          email: 'listorder@gmail.com',
          password: '123456'
        });

      const session = await request(app)
        .post('/sessions')
        .send({
          email: reseller.body.email,
          password: '123456'
        });

      const orders = await request(app)
        .get('/orders')
        .set('Authorization', `Bearer ${session.body.token}`);


      expect(orders.body).toEqual([]);
    });
  });
});
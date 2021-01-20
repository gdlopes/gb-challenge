import request from 'supertest';
import createConnection from '@database/index';

import { getConnection, Connection } from "typeorm";

import app from '../../app';

let connection: Connection;

describe('POST /orders', () => {
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

  describe('when try to create a new order', () => {
    it('should be able to create order', async () => {
      const reseller = await request(app)
        .post('/resellers')
        .send({
          name: 'Create Order',
          document: '36009965098',
          email: 'createorder@gmail.com',
          password: '123456'
        });

      const order = await request(app)
        .post('/orders')
        .send({
          code: '2345',
          value: 1399,
          resellerDocument: reseller.body.document
        });

      expect(order.status).toBe(200);
      expect(order.body.resellerDocument).toEqual(reseller.body.document);
      expect(order.body.value).toEqual('1399');
    });
  });
});
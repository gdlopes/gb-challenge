import request from 'supertest';
import createConnection from '@database/index';

import { getConnection, Connection } from "typeorm";

import app from '../../app';

let connection: Connection;

describe('GET /cashback/:document', () => {
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

  describe('when try to cashback value', () => {
    it('should be able to get cashback', async () => {
      const reseller = await request(app)
        .post('/resellers')
        .send({
          name: 'Cashback reseller',
          document: '12356753234',
          email: 'cashback@gmail.com',
          password: '123456'
        });

      const session = await request(app)
        .post('/sessions')
        .send({
          email: reseller.body.email,
          password: '123456'
        });

      const response = await request(app)
        .get(`/cashback/${reseller.body.document}`)
        .set('Authorization', `Bearer ${session.body.token}`);

      expect(response.body.reseller).toEqual(reseller.body.document);
      expect(response.body).toHaveProperty('accumulatedCashback');
    });
  });
});
import 'reflect-metadata';

import dotenv from 'dotenv';

dotenv.config({
  path: process.env.NODE_ENV === 'development' ? '.env.development' : '.env',
});

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import router from './routes';

import HandleError from '@middlewares/handleError';

import createConnection from './infra/typeorm/database';
createConnection();

import './container';

import logger from '@logger/';

const app = express();

app.use(express.json());
app.use(router);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof HandleError) {
    logger.error(err.message);

    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  logger.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
});

export default app;

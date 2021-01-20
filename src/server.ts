import 'reflect-metadata';

import app from './app';

import logger from '@logger/';

app.listen(process.env.APP_PORT || 3333, () => {
  logger.info(`🚀 Server started on port ${process.env.APP_PORT || 3333}`);
});


import pino from 'pino';

import logConfig from '@config/log';

export default pino({
  enabled: logConfig.enabled,
  level: logConfig.level
});
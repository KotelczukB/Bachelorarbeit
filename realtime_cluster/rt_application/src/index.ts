import logger from './logger';
import app from './app';
import { getPortInternal } from './modules/helpers/get-envs';

const port = getPortInternal();
const server = app.listen(port);

process.on('unhandledRejection', (reason, p) =>
  logger.error('Unhandled Rejection at: Promise ', p, reason)
);

server.on('listening', () =>
  logger.info('Feathers application started on http://%s:%d', getPortInternal(), port)
);

import logger from './logger';
import app from './app';
import { getPORT, getHOST } from './modules/get-envs';

const port = getPORT();
const server = app.listen(port);

process.on('unhandledRejection', (reason, p) =>
  logger.error('Unhandled Rejection at: Promise ', p, reason)
);

server.on('listening', () =>
  logger.info('Feathers application started on http://%s:%d', getHOST(), port)
);

import logger from './logger';
import app from './app';

export const getPORT = (): string => {
  if (process.env.PORT) {
    return process.env.PORT;
  } else {
    throw new Error('critical ENV Variable not provided')
  }
};

const port = getPORT();
const server = app.listen(port);

process.on('unhandledRejection', (reason, p) =>
  logger.error('Unhandled Rejection at: Promise ', p, reason)
);

server.on('listening', () =>
  logger.info('Feathers application started on http://%s:%d', app.get('host'), port)
);



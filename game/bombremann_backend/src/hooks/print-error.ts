import { Hook, HookContext } from '@feathersjs/feathers';
import logger from '../logger';

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    logger.error(`service: ${context.path} on ${context.method} throws ${context.error.message}`)
    throw new Error(context.error.message);
  };
}

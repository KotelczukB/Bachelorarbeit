
import { Hook, HookContext } from '@feathersjs/feathers';

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    console.log(`service: ${context.path} on ${context.method} in ${context.type} throws ${context.error.message}`)
    return context;
  };
}

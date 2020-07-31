import { Hook, HookContext } from '@feathersjs/feathers';

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    console.log(`service: ${context.path} on ${context.method} throws ${context.error.message}`)
    throw new Error(context.error.message);
    return context;
  };
}

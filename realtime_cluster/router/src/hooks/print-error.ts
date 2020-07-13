// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    console.log(`service: ${context.path} on ${context.method} throws ${context.error.message}`)
    return context;
  };
}
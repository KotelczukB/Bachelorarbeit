// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    if(context.params.provider !== undefined && context.params.provider !== 'server')
      throw new Error('Method not allowed')
    return context;
  };
}

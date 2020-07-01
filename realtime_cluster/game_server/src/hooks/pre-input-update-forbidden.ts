// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    const {app, params, data} = context;
    // Check if comming from outside
    if(params.connection && params.connection.user)
      throw new Error('Method forbidden');
    return context;
  };
}

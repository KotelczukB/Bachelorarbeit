// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';
import  rest  from '@feathersjs/rest-client';

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    const {data, app} = context;
    // configure Restclient for backend URL
    app.configure(rest(context.data.backend.serverURL).fetch(window.fetch));
    // Forward Auth Request
    const result = await app.service('clients').create(data);
    context.data.auth = result;
    context.data.succeed = result.succeed
    return context;
  };
}

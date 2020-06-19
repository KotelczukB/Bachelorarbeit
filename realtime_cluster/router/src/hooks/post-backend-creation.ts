// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';
import { updateObjects } from '../modules/objectsPatcher';

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    const {data, app} = context;
    const updatedServers = updateObjects(app.service('applications'), ['rtGameSever', 'rtChatServer'], {backend: data.serverURL}, {query: {backend: null}});
    context.result.rtservers = updatedServers;
    return context;
  };
}

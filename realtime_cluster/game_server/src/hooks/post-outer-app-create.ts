// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';
import { getFreeChannel } from '../modules/channels/channelfinder';

// adding channel name to client response

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    const {app, data} = context;
    data.channel = getFreeChannel(app, context.service.id, app.get('maxChannelConnections'));
    data.outerId = data.id;
    return context;
  };
}

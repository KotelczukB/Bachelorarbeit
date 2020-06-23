// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';
import { getFreeChannel } from '../modules/channels/channelfinder';
import { IConnectionData } from '../Models/Interfaces/IClientForm';

// adding channel name to client response

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    const {app, data} = context;
    const connection = (data.connection as IConnectionData); 
    if(!connection.targetChannel) {
      context.result.connection.targetChannel = 
        getFreeChannel(app, context.service.id, app.get('maxChannelConnections'));
    } else {
      context.result.connection.targetChannel = connection.targetChannel;
    }
    return context;
  };
}

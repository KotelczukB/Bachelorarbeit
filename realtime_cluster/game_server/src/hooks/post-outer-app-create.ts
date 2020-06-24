// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';
import { getFreeSession } from '../modules/channels/channelfinder';
import { IConnectionData } from '../Models/Interfaces/IClientForm';

// adding channel name to client response

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    const {app, data} = context;
    const connection = (data as IConnectionData); 
    if(!connection.targetChannel) {
      context.result.targetChannel = 
        await getFreeSession(app.service('sessions'), context.path, 'count',  app.get('maxChannelConnections'));
    } else {
      context.result.targetChannel = connection.targetChannel;
      context.result.sessionName = connection.targetChannel;
    }
    return context;
  };
}

// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext, Application } from '@feathersjs/feathers';
import prepareBackendMessageOnIncoming from '../modules/client-input/prepare-backend-message-on-incoming';
import IClientMessage from '../models/Interfaces/clients-inputs/IClientMessage';

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    const {result, app} = context as {result: IClientMessage, app: Application}
    const data = await prepareBackendMessageOnIncoming(result, app, 0);
   // console.log('HERE COMES JOHNY', data)
    context.result = data
    return context;
  };
}

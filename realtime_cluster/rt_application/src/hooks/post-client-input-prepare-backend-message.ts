// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext, Application } from '@feathersjs/feathers';
import prepareBackendMessageOnIncoming from '../modules/client-input/prepare-backend-message-on-incoming';
import IClientMessage from '../models/Interfaces/clients-inputs/IClientMessage';
import getTimeStamp from '../modules/helpers/getTimeStamp';

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    const {result, app} = context as {result: IClientMessage, app: Application}
    const last = app.get('lastsend');
    if(getTimeStamp() - last > 50)
    await app.service('backend-message').create(result);
   // console.log('HERE COMES JOHNY', data)
    return context;
  };
}

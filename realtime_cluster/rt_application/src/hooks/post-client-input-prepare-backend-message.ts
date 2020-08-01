
import { Hook, HookContext, Application } from '@feathersjs/feathers';
import IClientMessage from '../models/Interfaces/clients-inputs/IClientMessage';
import getTimeStamp from '../modules/helpers/getTimeStamp';
import { getMESSAGE_AWAITER } from '../modules/helpers/get-envs';

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    const {result, app} = context as {result: IClientMessage, app: Application}
    const last = app.get('lastsend');
    if(getTimeStamp() - (+last) > getMESSAGE_AWAITER()) {
      await app.service('backend-message').create(result);
    }
   // logger.info('HERE COMES JOHNY', data)
    return context;
  };
}

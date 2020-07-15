// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext, Application, Paginated } from '@feathersjs/feathers';
import { IBackendInput } from '../models/Interfaces/backend-inputs/IBackendInput';
import ISession from '../models/Interfaces/session/ISession';
import { addToDefaultParams } from '../modules/helpers/basic-default-service-params';

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    const {result, app} = context as {result: IBackendInput, app: Application}
    if(!result.game_ended) {
      const session: Paginated<ISession> = await app.service('sessions').find(addToDefaultParams({query: {session_name: result.session_name}}))
      result.client_channel = session.data[0].clients_channel
    }
    return context;
  };
}


import { Hook, HookContext, Application, Paginated } from '@feathersjs/feathers';
import { IBackendResponse } from '../models/Interfaces/backend-inputs/IBackendResponse';
import ISession from '../models/Interfaces/session/ISession';
import { addToDefaultParams } from '../modules/helpers/basic-default-service-params';
import getTimeStamp from '../modules/helpers/getTimeStamp';

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    const {result, app} = context as {result: IBackendResponse, app: Application}

      const session: Paginated<ISession> = await app.service('sessions').find(addToDefaultParams({query: {session_name: result.session_name}}))
      if(session.data.length > 0)
      result.client_channel = session.data[0].clients_channel
      result.newest_at = getTimeStamp();
    return context;
  };
}

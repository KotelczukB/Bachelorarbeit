// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext, Application } from '@feathersjs/feathers';
import ISessionCreate from '../models/Interfaces/session/ISessionCreate';
import { addToDefaultParams } from '../modules/helpers/basic-default-service-params';
import { IBackend } from '../models/Interfaces/backends/IBackend';

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    const {data, app} = context as {data: ISessionCreate, app: Application}
    /// Functional
    const result = await app.service('backends').find(addToDefaultParams({query: {own_url: data.backend_url}}))
    const backend: IBackend = result[0];
    data.interval = backend.interval;
    data.client_max = backend.max_players;
    data.client_min = backend.min_players;
    return context;
  };
}

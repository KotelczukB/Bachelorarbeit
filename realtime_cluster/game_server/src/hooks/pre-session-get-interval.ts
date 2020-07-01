// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext, Application } from '@feathersjs/feathers';
import ISessionCreate from '../models/Interfaces/session/ISessionCreate';
import { addToDefaultParams } from '../modules/helpers/basic-default-service-params';
import { IBackend } from '../models/Interfaces/IBackendForm';

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    const {data, app} = context as {data: ISessionCreate, app: Application}
    /// Functional
    const result = await app.service('backends').find(addToDefaultParams({query: {ownURL: data.backendURL}}))
    data.interval = (result.data[0] as IBackend).interval_value;
    return context;
  };
}

// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext, Application } from '@feathersjs/feathers';
import IClientInput from '../models/Interfaces/clients-inputs/IClientInput';
import { addToDefaultParams } from '../modules/helpers/basic-default-service-params';
import ISession from '../models/Interfaces/session/ISession';

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    const {data, app} = context as {data: IClientInput, app: Application}
    /// Functional
    const result = await app.service('sessions').find(addToDefaultParams({query: {session_name: data.session_name}}))
    const session: ISession = result.data;
    const minInterval = await app.get('min_rt_interval')
    if(session.interval_value < minInterval)
      // Do magic stuff
      // - get neuste Clientinputs for this session
      // -- do rtFuncs on Clientinputs
      // --- send to Backend
    return context;
  };
}

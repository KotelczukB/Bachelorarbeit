// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext, Application } from '@feathersjs/feathers';
import { addToDefaultParams } from '../modules/helpers/basic-default-service-params';
import { IBackend } from '../models/Interfaces/backends/IBackend';

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    const {data, app} = context as {data: IBackend, app: Application}
    /// Functional
    const result = await app.service('sessions').find(addToDefaultParams({query: {backend: data.ownURL}}));
    const sessions = result.data;
    setTimeout(() => {
      // do Magic stuff 
      // - fur eine Session 
      // -- hole neueste Clientinputs
      // --- mach alle rtMethoden
      // ---- sende an Backend
    }, data.interval_value)
    return context;
  };
}

// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext, Application } from '@feathersjs/feathers';
import { IBackend } from '../models/Interfaces/backends/IBackend';
import { addToDefaultParams } from '../modules/helpers/basic-default-service-params';

// ******************************
// Suche ob schon mal registriert
// ****************************** 

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    const {data, app} = context as {data: IBackend, app: Application};
    /// Functional

    return context;
  };
}

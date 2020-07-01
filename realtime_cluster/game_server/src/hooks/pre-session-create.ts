// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext, Application } from '@feathersjs/feathers';
import ISessionCreate from '../models/Interfaces/session/ISessionCreate';
import { IBackend } from '../models/Interfaces/IBackendForm';
import { addToDefaultParams } from '../modules/helpers/basic-default-service-params';

// **********************************
// Uberprufe und modifiziere ein Session Objekt vor dem speichern
// **********************************

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    const {data, app} = context as {data: ISessionCreate, app: Application};
    if(!data || data.backendURL === undefined)
      throw new Error('Session faild on create, not all props provided');
    return context;
  };
}

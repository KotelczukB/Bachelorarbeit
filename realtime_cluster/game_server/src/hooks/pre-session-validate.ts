// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext, Application } from '@feathersjs/feathers';
import ISessionCreate from '../models/Interfaces/session/ISessionCreate';
import validateSessionCreate from '../modules/sessions/validate-session-create';

// **********************************
// Uberprufe und falls notwendig modifiziere ein Session Objekt vor dem speichern
// **********************************

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    const {data, app} = context as {data: ISessionCreate, app: Application};
    if(validateSessionCreate(data))
      throw new Error('Session faild on create, not all props provided');
    return context;
  };
}

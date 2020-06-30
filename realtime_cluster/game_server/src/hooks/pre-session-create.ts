// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';
import ISessionCreate from '../models/Interfaces/session/ISessionCreate';

// **********************************
// Uberprufe und modifiziere ein Session Objekt vor dem speichern
// **********************************

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    const {data} = context as {data: ISessionCreate};
    if(!data || data.backendURL === undefined)
      throw new Error('Session faild on create, not all props provided');
    return context;
  };
}

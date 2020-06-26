// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';
import ISession from '../Models/session/ISession';

// **********************************
// Uberprufe und modifiziere ein Session Objekt vor dem speichern
// **********************************

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    const {data} = context;
    if(!data)
      throw new Error('Session faild on create')
    const name = data.name;
    const session: ISession = {
      createdAt: new Date(),
      session_name: name,
      count: 0,
      activ: true,
      client_names: [],
    }
    context.data = session;
    return context;
  };
}

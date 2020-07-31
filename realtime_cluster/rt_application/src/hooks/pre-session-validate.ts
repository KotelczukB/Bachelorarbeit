
import { Hook, HookContext, Application } from '@feathersjs/feathers';
import ISessionCreate from '../models/Interfaces/session/ISessionCreate';
import validateSessionCreate from '../modules/sessions/validate-session-create';

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    const {data, app} = context as {data: ISessionCreate, app: Application};
    if(validateSessionCreate(data))
      throw new Error('Session faild on create, not all props provided');
    return context;
  };
}

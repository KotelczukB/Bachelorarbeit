// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext, Application } from '@feathersjs/feathers';
import { validateUser } from '../modules/client-input/auth-on-clientinput';
import IClientMessage from '../models/Interfaces/clients-inputs/IClientMessage';

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    const {data, app} = context as {data: IClientMessage, app: Application};
    const auth: boolean = await validateUser(app.service('clients'), data);
    if(!auth)
      throw new Error('client-input not refer to saved client');
    return context;
  };
}

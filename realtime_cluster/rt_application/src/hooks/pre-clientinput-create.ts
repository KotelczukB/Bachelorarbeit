// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext, Application, Paginated } from '@feathersjs/feathers';
import { validateUser } from '../modules/client-input/auth-on-clientinput';
import IClientMessage from '../models/Interfaces/clients-inputs/IClientMessage';
import { getType } from '../modules/helpers/get-envs';
import { _AppType } from '../models/Interfaces/_AppType';

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    const {data, app} = context as {data: IClientMessage, app: Application};
    if(getType() !== _AppType[_AppType.application]) {
      throw new Error('Game functionality not provided')
    }
    const auth: boolean = await validateUser(app.service('clients'), data);
    if(!auth)
      throw new Error('client-input not refer to saved client');
    return context;
  };
}

// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext, Application, Paginated } from '@feathersjs/feathers';
import { validateUser } from '../modules/client-input/auth-on-clientinput';
import IClientMessage from '../models/Interfaces/clients-inputs/IClientMessage';
import { getType } from '../modules/helpers/get-envs';
import { _AppType } from '../models/Interfaces/_AppType';
import { addToDefaultParams } from '../modules/helpers/basic-default-service-params';

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    const {data, app} = context as {data: IClientMessage, app: Application};
    if(getType() !== _AppType[_AppType.application]) {
      throw new Error('Game functionality not provided')
    }
    const auth: boolean = await validateUser(app.service('clients'), data);
    if(!auth)
      throw new Error('client-input not refer to saved client');
    const old_messages = await app.service('client-inputs').find(addToDefaultParams({query: {client_id: data.client_id}})) 
    await Promise.all(old_messages.data.map((elem: any) => app.service('client-inputs').remove(elem._id)))
    return context;
  };
}

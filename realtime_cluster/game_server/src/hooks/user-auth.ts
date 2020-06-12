// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';
import { IUser } from '../Models/IUser';
import { ERoles } from '../Models/ERoles';

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    const {data, app, method} = context;
    let user: IUser = await app.service('users').find(data['id']);
    if(!user || !user.Barer || user.Barer === '')
      throw new Error('Application not registerd');

    if(method !== 'create' && user.role !== ERoles.ClusterApp)
      throw new Error('Application do not have premission for this action');
      
    return context;
  };
}

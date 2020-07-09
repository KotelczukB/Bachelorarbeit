// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext, Application } from '@feathersjs/feathers';
import { IClientLogin } from '../models/IClientLogin';
import fetch from 'node-fetch';
import createClientLogin from '../modules/create-client-login';

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    const {data, app} = context as {data: IClientLogin, app: Application}
    const backend_resp = await fetch(data.backend_url, {
      method: context.method === 'create' ? 'POST' : 'GET',
      body: JSON.stringify(createClientLogin(data)),
      headers: {"Accept" : "application/json"}
    })
    if(!backend_resp.ok) 
      throw new Error('Backend Login or Register faild!');
    const respJSON = await backend_resp.json();
    if(context.method === 'create')
      data.rt_server_names = respJSON.rt_serverURLs;
    if(context.method === 'find') {
      const user_resp = await app.service('users').find({query: {id: data.id, user_name: data.user_name}})
      if(user_resp.data.length > 0)
        await app.service('users').patch(user_resp.data[0]._id, {rt_server_names: respJSON.rt_serverURLs})
    }
    data.password = '';
    return context;
  };
}

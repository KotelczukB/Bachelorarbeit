// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext, Application } from '@feathersjs/feathers';
import { IPlayerInputDTO } from '../models/IPlayerInputDTO';
import { _BasicState } from '../models/SessionState';
import { IRTServer } from '../models/IRTServer';

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    const {data, app} = context as {data: IPlayerInputDTO, app: Application}
    const rt_server_res = await app.service("rt_server").find({query: {serverURL: data.rt_serverURL, status: _BasicState.active}})
    if(rt_server_res.data.lenght < 1) {
      const all_servers = await app.service("rt_server").find({query: {status: _BasicState.active}})
      await all_servers.data.forEach(async (element: IRTServer) => {
        await app.service("rt_server").patch(element._id, {status: _BasicState.closed});
      });
      await app.service("rt_server").create({serverURL: data.rt_serverURL, status: _BasicState.active})
    }
    return context;
  };
}

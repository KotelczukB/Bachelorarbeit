// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from "@feathersjs/feathers";
import { IPlayerResponseDTO } from "../models/IPlayerResponseDTO";
import { _BasicState } from "../models/SessionState";
import { IRTServer } from "../models/IRTServer";

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    const { result, app } = context;
    const rt_server = await app.service('rt-server').find({query: {state: _BasicState.active}});
    const newData: IPlayerResponseDTO = {
      id: result.data[0].id,
      token: result.data[0].token,
      user_name: result.data[0].user_name,
      rt_serverURLs: rt_server.data.lenght > 1? rt_server.data : null
    }
    result.data[0] = newData;
    return context;
  };
};

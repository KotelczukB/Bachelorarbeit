// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from "@feathersjs/feathers";
import { _BasicState } from "../models/_SessionState";

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    const { result, app } = context;
    const rt_server = await app.service('rt-server').find({query: {state: _BasicState[_BasicState.active]}});
    result.password = null;
    result.rt_setUp = rt_server.data.length > 1? rt_server.data : null;
    result.min_players = +app.get("min_players");
    return context;
  };
};

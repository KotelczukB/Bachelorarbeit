// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext, Application } from "@feathersjs/feathers";
import { _BasicState } from "../models/_SessionState";
import { IPlayerResponseDTO } from "../models/IPlayerResponseDTO";

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    const { result, app } = context as {
      result: IPlayerResponseDTO;
      app: Application;
    };
    const rt_server = await app
      .service("rt-server")
      .find({ query: { state: _BasicState[_BasicState.active] } });
    if (context.method === "create") {
      result.password = null;
      result.rt_setUp = rt_server.data.length > 1 ? rt_server.data : null;
      result.backend_url = `http://${app.get("host")}:${app.get("port")}`;
    } else {
      if(context.params.provider !== undefined && context.params.provider !== 'server' && (result as any).data.length > 0)
      (result as any).data[0].rt_setUp = rt_server.data.length > 1 ? rt_server.data : null;
    }
    return context;
  };
};

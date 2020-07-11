// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import {
  Hook,
  HookContext,
  Application,
  Paginated,
} from "@feathersjs/feathers";
import { IPlayerInputDTO } from "../models/IPlayerInput";
import { _BasicState } from "../models/_SessionState";
import { IRTServer } from "../models/IRTServer";
import { IPlayerLogIn } from "../models/IPlayerLogIn";

//*************************************** */
// Validiere den Player token... damit kein andere durch kommt
// Validiere ob die gegebenen Server immer noch akutell sind -> wenn nicht akualisiere die DB (rt__server down client hat ein neuen angefragt)
//**************************************** */

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    const { data, app } = context as {
      data: IPlayerInputDTO;
      app: Application;
    };
    const rt_server_res: Paginated<IRTServer> = await app
      .service("rt_server")
      .find({
        query: { serverURL: data.rt_serverURL, state: _BasicState.active },
      });
    if (rt_server_res.data.length < 1) {
      const all_servers = await app
        .service("rt_server")
        .find({ query: { state: _BasicState.active } });
      await all_servers.data.forEach(async (element: IRTServer) => {
        await app
          .service("rt_server")
          .patch(element._id, { state: _BasicState.inactive });
      });
      await app
        .service("rt_server")
        .create({ serverURL: data.rt_serverURL, state: _BasicState.active });
    }
    return context;
  };
};

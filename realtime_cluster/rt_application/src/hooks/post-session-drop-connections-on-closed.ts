// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext, Application } from "@feathersjs/feathers";
import ISession from "../models/Interfaces/session/ISession";
import { _SessionState } from "../models/enums/_SessionState";
import { _AppType } from "../models/Interfaces/_AppType";
import handleClosedSession, { leaveChannel } from "../modules/sessions/handle-closed-session";
import { getType } from "../modules/helpers/get-envs";

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    const { data, app } = context as { data: ISession; app: Application };
    if (data.state === _SessionState.closed)
      // drop all connections
      leaveChannel(data.clients_channel, app)
      handleClosedSession(data, app, (<any>_AppType)[getType()])
      leaveChannel(data.backends_channel, app)
    return context;
  };
};


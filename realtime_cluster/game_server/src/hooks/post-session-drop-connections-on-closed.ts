// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext, Application } from "@feathersjs/feathers";
import ISession from "../models/Interfaces/session/ISession";
import { SessionState } from "../models/enums/SessionState";
import { _AppType } from "../models/Interfaces/_AppType";
import getEnvTYPE from "../modules/helpers/get-env-TYPE";
import collectChatSendToBackend from "../modules/rtFunctions/collect-chat-send-to-backend";
import handleClosedSession, { leaveChannel } from "../modules/sessions/handle-closed-session";

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    const { data, app } = context as { data: ISession; app: Application };
    if (data.state === SessionState.closed)
      // drop all connections
      leaveChannel(data.clients_channel, app)
      handleClosedSession(data, app, (<any>_AppType)[getEnvTYPE(app)])
      leaveChannel(data.backends_channel, app)
    return context;
  };
};


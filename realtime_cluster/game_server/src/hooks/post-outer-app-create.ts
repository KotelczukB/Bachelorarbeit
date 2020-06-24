// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from "@feathersjs/feathers";
import { getFreeSession } from "../modules/channels/session-finder";
import { IConnectionData } from "../Models/Interfaces/IClientForm";
import { createSession } from "../modules/channels/session-creater";

// adding channel name to client response

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    const { app, data } = context;
    const connection = data as IConnectionData;
    if (!connection.targetChannel) {
      const service: any = app.service("sessions");
      const targetChannel: string =
        (await getFreeSession(service, app.get("maxChannelConnections"))) ??
        (await createSession(service, context.path));
      context.result.targetChannel = targetChannel
    } else {
      context.result.targetChannel = connection.targetChannel;
      context.result.sessionName = connection.targetChannel;
    }
    return context;
  };
};

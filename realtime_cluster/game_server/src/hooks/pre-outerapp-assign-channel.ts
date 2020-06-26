// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from "@feathersjs/feathers";
import { getFreeSession } from "../modules/channels/session-finder";
import { IConnectionData } from "../Models/Interfaces/IClientForm";
import { createSession } from "../modules/channels/session-creater";
import { assignSessionAndChannelName } from "../modules/helpers/assign-session-channel";

// ************************************************
// Suche oder erstelle eine freie Session und ubergebe diese an den Client
// ************************************************
export default (options = {}): Hook => {
  return async (context: HookContext) => {
    const { app, data, path } = context;
    const connection = data as IConnectionData;
    if (!connection.targetChannel && !connection.sessionName) {
      const service: any = app.service("sessions");
      const targetChannel: string =
        (await getFreeSession(
          service,
          app.get(`maxChannelConnections-${path}`)
        )) ?? (await createSession(service, context.path));
      // error: Unhandled Rejection at: Promise  wtf?
      if (!targetChannel)
        throw new Error("no channel exists or can be created");
      context.data = assignSessionAndChannelName(connection, targetChannel)
    } else {
      context.data = assignSessionAndChannelName(connection, connection.targetChannel)
    }
    return context;
  };
};

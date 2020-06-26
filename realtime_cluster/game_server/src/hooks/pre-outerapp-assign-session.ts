// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from "@feathersjs/feathers";
import { getFreeSession } from "../modules/channels/session-finder";
import { IClient } from "../Models/Interfaces/IClientForm";
import { createSession } from "../modules/channels/session-creater";
import { assignSessionAndChannelName } from "../modules/helpers/assign-session-channel";
import { IBackend } from "../models/Interfaces/IBackendForm";

// ************************************************
// Suche oder erstelle eine freie Session und ubergebe diese an den Client
// ************************************************
export default (options = {}): Hook => {
  return async (context: HookContext) => {
    const { app, data, path } = context;
    const appData = data as IClient | IBackend;
    if (!appData.network.targetChannel && !appData.network.sessionName) {
      const service: any = app.service("sessions");
      const targetChannel: string =
        (await getFreeSession(
          service,
          app.get(`maxChannelConnections-${path}`),
          path,
          ((<IClient>appData).network.targetServerURL ?? undefined)
        )) ?? (await createSession(service, context.path));
      // error: Unhandled Rejection at: Promise  wtf?
      if (!targetChannel)
        throw new Error("no channel exists or can be created");
      context.data = assignSessionAndChannelName(appData, targetChannel);
    } else {
      // Sicher gehen dass auch wirklich beide mit gleichen Daten belegt sind
      context.data = assignSessionAndChannelName(
        appData,
        appData.network.targetChannel
      );
    }
    return context;
  };
};

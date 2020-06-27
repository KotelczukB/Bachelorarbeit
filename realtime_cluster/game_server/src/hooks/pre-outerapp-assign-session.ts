// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from "@feathersjs/feathers";
import { IClient } from "../Models/Interfaces/IClientForm";
import assignSessionAndChannelName from "../modules/helpers/assign-session-channel";
import findOrCreateSession from "../modules/helpers/find_or_create_session";
import createSessionData from "../modules/helpers/create_session_data";

// ************************************************
// Suche oder erstelle eine freie Session und ubergebe diese an den Client
// ************************************************
export default (options = {}): Hook => {
  return async (context: HookContext) => {
    const { app, data, path } = context;
    const client = data as IClient;
    if (!client.network.targetChannel && !client.network.sessionName) {
      const targetChannel: string | null = await findOrCreateSession(
        app.service("sessions"),
        app.get(`maxChannelConnections-${path}`),
        path,
        app.service("backends"),
        createSessionData(client.network.targetServerURL, client.id)
      );
      // error: Unhandled Rejection at: Promise  wtf?
      if (!targetChannel)
        throw new Error("no channel exists or can be created");
      context.data = assignSessionAndChannelName(client, targetChannel);
    } else {
      // Sicher gehen dass auch wirklich beide mit gleichen Daten belegt sind
      context.data = assignSessionAndChannelName(
        client,
        client.network.targetChannel
      );
    }
    return context;
  };
};

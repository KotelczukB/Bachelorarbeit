// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from "@feathersjs/feathers";
import { IClient } from "../Models/Interfaces/IClientForm";
import assignSessionAndChannelName from "../modules/helpers/assign-session-channel";
import findOrCreateSession from "../modules/helpers/find_or_create_session";
import createSessionData from "../modules/helpers/create_session_data";
import validateClientSessionProp from "../modules/helpers/validate-client-session-prop";

// ************************************************
// Suche oder erstelle eine freie Session und ubergebe diese an den Client
// ************************************************
export default (options = {}): Hook => {
  return async (context: HookContext) => {
    const { app, data, path } = context;
    const client = data as IClient;
    // 1 bedeutet dass es ein neuer Client ist
    if (validateClientSessionProp(client.network) === 1) {
      const targetChannel: { user: string; session: string, backend: string}  | null = await findOrCreateSession(
        app.service("sessions"),
        app.get(`maxChannelConnections-${path}`),
        path,
        app.service("backends"),
        createSessionData(client.network.targetServerURL, client.id)
      );
      if (!targetChannel)
        throw new Error("no channel exists or can be created");
      context.data = assignSessionAndChannelName(client, targetChannel.session, targetChannel.user);
      // -1 da ist irg.was schief gegangen
    } else if(validateClientSessionProp(client.network) === -1) {
      throw new Error("connection Data incomplete missing channel or session")
    }
    return context;
  };
};

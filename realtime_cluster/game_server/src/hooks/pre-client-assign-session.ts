// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from "@feathersjs/feathers";
import { IClient } from "../Models/Interfaces/IClientForm";
import assignSessionAndChannelName from "../modules/helpers/assign-session-channel";
import findOrCreateSession from "../modules/helpers/find-or-create-session";
import createSessionData from "../modules/helpers/create-session-data";
import validateClientSessionProp from "../modules/helpers/validate-client-session-prop";

// ************************************************
// Suche oder erstelle eine freie Session und ubergebe diese an den Client
// ************************************************
export default (options = {}): Hook => {
  return async (context: HookContext) => {
    const { app, data, path } = context as {app: any, data: IClient, path: string};
    // 1 bedeutet dass es ein neuer Client ist
    if (validateClientSessionProp(data.network) === 1) {
      const targetChannel: { user: string; session: string, backend: string}  | null = await findOrCreateSession(
        app.service("sessions"),
        app.get(`maxChannelConnections-${path}`),
        path,
        app.service("backends"),
        createSessionData(data.network.backend_server_URL, data.id)
      );
      if (!targetChannel)
        throw new Error("no channel exists or can be created");
      context.data = assignSessionAndChannelName(data, targetChannel.session, targetChannel.user);
      // -1 da ist irg.was schief gegangen
    } else if(validateClientSessionProp(data.network) === -1) {
       throw new Error("connection data incomplete. Missing channel or session")
    }
    return context;
  };
};

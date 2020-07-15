// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from "@feathersjs/feathers";
import assignSessionAndChannelName from "../modules/sessions/assign-session-channel";
import findOrCreateSession from "../modules/clients/find-or-create-session-for-client";
import createSessionData from "../modules/sessions/create-session-data";
import validateClientSessionProp from "../modules/clients/validate-client-session-prop";
import { IClientConnection } from "../models/Interfaces/clients/IClientConnection";

// ************************************************
// Suche oder erstelle eine freie Session und ubergebe diese an den Client
// ************************************************
export default (options = {}): Hook => {
  return async (context: HookContext) => {
    const { app, data, path } = context as {app: any, data: IClientConnection, path: string};
    // 1 bedeutet dass es ein neuer Client ist
    if (validateClientSessionProp(data) === 1) {
      const targetChannel: { user: string; session: string, backend: string}  | null = await findOrCreateSession(
        app.service("sessions"),
        path,
        app.service("backends"),
        createSessionData(data.backend_url, data.user_name, app.service('backends'))
      );
      if (!targetChannel)
        throw new Error("no channel exists or can be created");
      context.data = assignSessionAndChannelName(data, targetChannel.session, targetChannel.user);
      // -1 da ist irg.was schief gegangen
    } else if(validateClientSessionProp(data) === -1) {
       throw new Error("connection data incomplete. Missing channel or session")
    }
    return context;
  };
};

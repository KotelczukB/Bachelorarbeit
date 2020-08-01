
import { Hook, HookContext } from "@feathersjs/feathers";
import assignSessionAndChannelName from "../modules/sessions/assign-session-channel";
import createSessionData from "../modules/sessions/create-session-data";
import validateClientSessionProp from "../modules/clients/validate-client-session-prop";
import { IClientConnection } from "../models/Interfaces/clients/IClientConnection";
import { getType } from "../modules/helpers/get-envs";
import { _AppType } from "../models/Interfaces/_AppType";
import provideSessionToClient from "../modules/clients/provide-session-to-client";

// ************************************************
// Search or create session for the client
// ************************************************
export default (options = {}): Hook => {
  return async (context: HookContext) => {
    const { app, data, path } = context as {app: any, data: IClientConnection, path: string};
    // 1 bedeutet dass es ein neuer Client ist
    if(getType() === _AppType[_AppType.application])
      if (validateClientSessionProp(data) === 1) {
        const targetChannel: { user: string; session: string, backend: string}  | null = await provideSessionToClient (
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

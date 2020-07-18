// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext, Application } from "@feathersjs/feathers";
import { searchAndRemoveFromSessions } from "../modules/sessions/remove-from-sessions";
import ISession from "../models/Interfaces/session/ISession";
import findOnServiceGetFirst from "../modules/helpers/find-on-service-get-first";
import { default_params } from "../modules/helpers/basic-default-service-params";
import { IClientConnection } from "../models/Interfaces/clients/IClientConnection";

// ************************************************
// a)
// Entferne den Client aus laufenden Sessions, Massnahme um Redundanzen zu vermeiden
//
// b)
// Hinzufuge den Client zu der angebenen Session
// Ein Client kennt nur eine Session die aktiv ist, fals die Verbindung verloren gegangen ist
// ************************************************

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    const { data, app } = context as {data: IClientConnection, app: Application};
    // a)
    await searchAndRemoveFromSessions(data.user_name, app.service("sessions")).catch((err: any) =>
    console.log("pre clinet reconnect session on search and remove", err));
    // b)

    if (data.session_name) {
      const session: ISession | null = await findOnServiceGetFirst(app.service("sessions"), {
        query: { session_name: data.session_name, state: {$lt: 2} },
      });
      if (session) {
        await app.service("sessions").patch(session._id, {
          $push: { clients: data.user_name },
        }, default_params).catch((err: any) =>
        console.log("pre clinet reconnect session patch session", err));
        context.data.targetChannel = session.clients_channel;
      }
      return context;
    }
  };
};

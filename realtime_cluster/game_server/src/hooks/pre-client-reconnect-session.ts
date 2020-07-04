// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from "@feathersjs/feathers";
import { searchAndRemoveFromSessions } from "../modules/sessions/remove-from-sessions";
import ISession from "../models/Interfaces/session/ISession";
import { IClient } from "../models/Interfaces/clients/IClient";
import findOnServiceGetFirst from "../modules/helpers/find-on-service-get-first";
import { default_params } from "../modules/helpers/basic-default-service-params";

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
    const { data, app } = context;
    const clientData: IClient = data;
    // a)
    await searchAndRemoveFromSessions(clientData.id, app.service("sessions"));
    // b)

    /// Functional
    if (clientData.network.session_name) {
      const session: ISession | null = await findOnServiceGetFirst(app.service("sessions"), {
        query: { session_name: clientData.network.session_name, state: 0 },
      });
      if (session) {
        await app.service("sessions").patch(session._id, {
          $push: { clients: clientData.id },
        }, default_params);
        context.data.targetChannel = session.clients_channel;
      }
      return context;
    }
  };
};

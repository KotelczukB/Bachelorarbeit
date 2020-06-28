// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from "@feathersjs/feathers";
import { searchAndRemoveFromSessions } from "../modules/sessions/remove-sessions";
import ISession from "../models/Interfaces/session/ISession";
import { IClient } from "../Models/Interfaces/IClientForm";
import findOnServiceGetFirst from "../modules/helpers/find-on-service-get-first";

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
    if (clientData.network.sessionName) {
      const session: ISession | null = await findOnServiceGetFirst(app.service("sessions"), {
        query: { session_name: clientData.network.sessionName, activ: true },
      });
      if (session) {
        await app.service("sessions").patch(session._id, {
          $push: { clients: clientData.id },
        });
        context.data.targetChannel = session.clients_channel;
      }
      return context;
    }
  };
};

// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from "@feathersjs/feathers";
import { searchAndRemoveFromSessions } from "../modules/clients/remove-sessions";
import ISession from "../Models/session/ISession";

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
    const connectData: ISession = data;
    // a) 
    await searchAndRemoveFromSessions(connectData.id, app.service("sessions"));
    // b)
    if (connectData.sessionName) {
      const session: ISession | null = await app
        .service("sessions")
        .find({ session_name: connectData.sessionName, active: true });
      if (session) {
        await app.service("sessions").patch(
          {
            client_names: session.client_names.push(connectData.id),
          },
          {
            session_name: session.session_name,
          }
        );
        context.data.targetChannel = session.session_name;
      }
      return context;
    }
  };
};

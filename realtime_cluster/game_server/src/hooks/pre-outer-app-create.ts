// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from "@feathersjs/feathers";
import { IConnectionData } from "../Models/Interfaces/IClientForm";
import ISession from "../Models/session/ISession";

// Authentification with an timestamed key from router

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    const { data, app } = context;
    const connectData = data.connection as IConnectionData;
    // Validate token
    if (!connectData.token || connectData.token !== "yes")
      throw new Error("premission denied");
    // check if already exists unter runnung sessions
    if (connectData.sessionName) {
      const session: ISession | null = await app
        .service("sessions")
        .find({ session_name: connectData.sessionName, active: true });
      if (session)
        await app.service("sessions").patch(
          {
            client_names: session.client_names.push(connectData.id),
          },
          {
            session_name: session.session_name,
          }
        );
    }
    return context;
  };
};

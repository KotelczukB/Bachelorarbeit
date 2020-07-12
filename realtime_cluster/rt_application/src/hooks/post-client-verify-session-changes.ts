// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import {
  Hook,
  HookContext,
  Application,
  Paginated,
} from "@feathersjs/feathers";
import {
  validateIncreaseSessionState,
  switcher,
} from "../modules/sessions/session-switcher-obj";
import switchSessionState from "../modules/sessions/switch-session-state";
import { validateSessionRequierdProps } from "../modules/sessions/validate-session";
import ISession from "../models/Interfaces/session/ISession";
import { _SessionState } from "../models/enums/_SessionState";
import { addToDefaultParams } from "../modules/helpers/basic-default-service-params";
import { IClientConnection } from "../models/Interfaces/clients/IClientConnection";
import updateClientOnBackendWithBackendChannel from "../modules/clients/update-client-on-backend-with-backend-channel";

//******************************************************************
//Prufe vorausgesetzte props von Sessions, prufe anzahl von Clients.
// falls < maxCount sende alle Clients an das Backend und setzte den status von aktiv auf running
// bei jedem weiterem Client und solange die Session nicht "full" oder "closed" ist sende ein update an das Backend
// wenn dei Session "full" oder "closed" ist dann werf einen Fehler dass die Session bereits geschlossen ist
//******************************************************************

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    const { result, app } = context as {
      result: IClientConnection;
      app: Application;
    };
    const session_name = await app
      .service("sessions")
      .find(
        addToDefaultParams({ query: { session_name: result.session_name } })
      )
      .then(async (response: Paginated<ISession>) =>
        validateSessionRequierdProps(response.data[0])
          ? await validateIncreaseSessionState(
              switchSessionState,
              switcher,
              app
            ).then(
              async (
                res: (
                  session: ISession
                ) => Promise<{
                  new_state: _SessionState;
                  session_name: string;
                }>
              ) =>
                await res(response.data[0]).then(
                  async (state: {
                    new_state: _SessionState;
                    session_name: string;
                  }) => {
                    await updateSession(app, response.data, state.new_state);
                    return state.session_name;
                  }
                )
            )
          : null
      )
      .catch((error: any) => console.log(error));
    console.log(session_name);
    await updateClientOnBackendWithBackendChannel(result.backend_url, session_name, result.token, app);
    return context;
  };
};

// Helper
export const updateSession = async (
  app: Application,
  sessions: ISession[],
  state: _SessionState
) =>
  sessions[0].state !== state
    ? await app.service("sessions").patch(sessions[0]._id, { state: state })
    : {};

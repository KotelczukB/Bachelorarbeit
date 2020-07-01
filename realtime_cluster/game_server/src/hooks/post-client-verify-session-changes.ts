// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext, Application } from "@feathersjs/feathers";
import {
  validateIncreaseSessionState,
  switcher,
} from "../modules/sessions/session-switcher-obj";
import switchSessionState from "../modules/sessions/switch-session-state";
import { validateSessionRequierdProps } from "../modules/sessions/validate-session";
import ISession from "../models/Interfaces/session/ISession";
import { SessionState } from "../models/enums/SessionState";
import { addToDefaultParams } from "../modules/helpers/basic-default-service-params";
import { IClient } from "../models/Interfaces/clients/IClient";

//******************************************************************
//Prufe vorausgesetzte props von Sessions, prufe anzahl von Clients.
// falls < maxCount sende alle Clients an das Backend und setzte den status von aktiv auf running
// bei jedem weiterem Client und solange die Session nicht "full" oder "closed" ist sende ein update an das Backend
// wenn dei Session "full" oder "closed" ist dann werf einen Fehler dass die Session bereits geschlossen ist
//******************************************************************  

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    const { result, app } = context as { result: IClient; app: Application };
    app.service("sessions")
      .find(addToDefaultParams({ query: { session_name: result.network.session_name } }))
      .then((response: { [idx: string]: any, data: ISession }) =>
        validateSessionRequierdProps(response.data as ISession)
          ? validateIncreaseSessionState(
              switchSessionState,
              switcher
            ).then((res: (session: ISession) => Promise<SessionState>) =>
              res(response.data).then(async (state: SessionState) =>
                response.data.state !== state
                  ? await app
                      .service("sessions")
                      .update(response.data._id, { state: state })
                  : null
              )
            )
          : null
      ).catch((error: any) => console.log(error));
    return context;
  };
};

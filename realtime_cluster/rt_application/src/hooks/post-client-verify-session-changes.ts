
import {
  Hook,
  HookContext,
  Application,
  Paginated,
} from "@feathersjs/feathers";
import {
  validateIncreaseSessionState,
} from "../modules/sessions/session-switcher-obj";
import { validateSessionRequierdProps } from "../modules/sessions/validate-session";
import ISession from "../models/Interfaces/session/ISession";
import { _SessionState } from "../models/enums/_SessionState";
import { addToDefaultParams } from "../modules/helpers/basic-default-service-params";
import { IClientConnection } from "../models/Interfaces/clients/IClientConnection";
import updateClientOnBackendWithBackendChannel from "../modules/clients/update-client-on-backend-with-backend-channel";
import { getType } from "../modules/helpers/get-envs";
import { _AppType } from "../models/Interfaces/_AppType";
import logger from "../logger";

//******************************************************************
// Check session props and count clients in session
// If count < maxCount send all clients to backend and set new session state
// On every other new client, as long as session state is't 'full' or 'closed' send update to Backend 
// On session closed abort action 
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
      .then(async (response: Paginated<ISession>) => {
        if (validateSessionRequierdProps(response.data[0]))
          return await validateIncreaseSessionState(app, response.data[0])
      })
      .catch((error: any) => logger.error('Exception on session state switch', error));
    if (getType() !== _AppType[_AppType.chat])
    await updateClientOnBackendWithBackendChannel(
      result.backend_url,
      session_name,
      result.token,
      app
    );
    return context;
  };
};


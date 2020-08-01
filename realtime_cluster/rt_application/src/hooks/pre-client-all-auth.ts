
import { Hook, HookContext, Params, Application } from "@feathersjs/feathers";
import authClientAgainstBackend from "../modules/clients/auth-client-against-backend";
import { IClientConnection } from "../models/Interfaces/clients/IClientConnection";
import logger from "../logger";

// *************************************
// Authorize client on backend
// ************************************

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    const { data, params, app } = context as {data: IClientConnection, params: Params, app:Application};
    if(params.provider && params.provider !== "server")
      await authClientAgainstBackend(app.service("backends"), data).then((resp: boolean) => {
        if(!resp)
          throw new Error('Backend refused Client')
      }).catch((err: any) => logger.error(`Pre client auth err ${err.message}`));
    return context;
  };
};

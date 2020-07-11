// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext, Params, Application } from "@feathersjs/feathers";
import authClientAgainstBackend from "../modules/clients/auth-client-against-backend";
import { IClientConnection } from "../models/Interfaces/clients/IClientConnection";

// *************************************
// Authorisiere Client mit seinem Token auf dem Backend um zu prufen, dass der Client berechtig ist auf 
// sein TargetBackend zu zugreifen
// ************************************

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    const { data, params, app } = context as {data: IClientConnection, params: Params, app:Application};
    if(params.provider && params.provider !== "server")
      await authClientAgainstBackend(app.service("backends"), data).then((resp: boolean) => {
        if(!resp)
          throw new Error('Backend refused Client')
      });
    return context;
  };
};

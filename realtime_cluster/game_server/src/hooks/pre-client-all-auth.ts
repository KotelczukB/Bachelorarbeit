// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext, Params } from "@feathersjs/feathers";
import { IClient } from "../models/Interfaces/clients/IClient";
import authClientAgainstBackend from "../modules/clients/auth-client-against-backend";

// *************************************
// Authorisiere Client mit seinem Token auf dem Backend um zu prufen, dass der Client berechtig ist auf 
// sein TargetBackend zu zugreifen
// ************************************

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    const { data, params } = context as {data: IClient, params: Params};
    if(params.provider && params.provider === "server")
      authClientAgainstBackend(data).then((resp: boolean) => {
        if(!resp)
          throw new Error('Backend refused Client')
        data.network.backend_auth = resp;
      });
    return context;
  };
};

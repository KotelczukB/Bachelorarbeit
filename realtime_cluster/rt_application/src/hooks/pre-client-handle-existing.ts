// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from "@feathersjs/feathers";
import findExistingClient from "../modules/clients/find-existing-client";
import { IClientConnection } from "../models/Interfaces/clients/IClientConnection";

// ************************************************
// Entferne den Client aus der DB, Redundanzen vermeidung
// ************************************************

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    const { data, app, path } = context as {data: IClientConnection, app: any, path: string};
    /// Functional
    const exsists = await findExistingClient(app.service(path), data.user_name);
    if (exsists)
      await app.service(path).remove(exsists._id);
    return context;
  };
};

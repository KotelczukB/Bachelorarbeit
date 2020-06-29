// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from "@feathersjs/feathers";
import { IClient } from "../Models/Interfaces/IClientForm";
import findExistingClient from "../modules/clients/find-existing-client";

// ************************************************
// Entferne den Client aus der DB, Redundanzen vermeidung
// ************************************************

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    const { data, app, path } = context as {data: IClient, app: any, path: string};
    const exsists = await findExistingClient(app.service(path), data.id);
    if (exsists)
      await app.service(path).remove(exsists._id);
    return context;
  };
};

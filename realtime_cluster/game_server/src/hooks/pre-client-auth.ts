// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from "@feathersjs/feathers";
import { IClient } from "../Models/Interfaces/IClientForm";

// Authentification with an timestamed key from router

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    const { data, app } = context;
    const clientData: IClient = data;
    // Validate token
    if (!clientData.token || clientData.token !== "yes")
      throw new Error("premission denied");

    return context;
  };
};

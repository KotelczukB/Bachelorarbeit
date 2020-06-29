// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from "@feathersjs/feathers";
import IClientForm from "../Models/Interfaces/IClientForm";
import validateClientForm from "../modules/helpers/validate-client_form";
import createPing from "../modules/helpers/create-ping";

// ******************************************
// Validiert die mindest Anforderungen der Form und pruft den ping
// falls der ping > syncPing in der zugewiesenen Session so wird dieser verwendet
// ******************************************

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    const { data, app } = context;
    const client: IClientForm = data;
    if (!validateClientForm(client, app))
      throw new Error("Input does not satisfied basic requirements");
    await createPing(client, app.service("clients"), app.service("sessions"));
    return context;
  };
};

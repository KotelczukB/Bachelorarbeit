// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext, Application } from "@feathersjs/feathers";
import validateClientForm from "../modules/helpers/validate-client_form";
import createPing from "../modules/helpers/create-ping";
import IClientInput from "../models/Interfaces/clients-inputs/IClientInput";

// ******************************************
// Validiert die mindest Anforderungen der Form und pruft den ping
// falls der ping > syncPing in der zugewiesenen Session so wird dieser verwendet
// ******************************************

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    const { data, app } = context as {data: IClientInput, app: Application};
    if (!validateClientForm(data, app))
      throw new Error("Input does not satisfied basic requirements");
    data.ping = await createPing(data, app.service("sessions"));
    return context;
  };
};

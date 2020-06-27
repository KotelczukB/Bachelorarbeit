// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext, Application } from "@feathersjs/feathers";
import IClientForm from "../Models/Interfaces/IClientForm";
import getPing from "../modules/helpers/create_ping";
import validateClientForm from "../modules/helpers/validate_client_form";

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
    const client_ping = getPing(client.sended_utc_timestamp);
    await app.service("clients").patch(client.client_data.id, {
      $set: { ping: client_ping },
    });
    await app.service("sessions")
      .patch(
        null,
        { $set: { syncPing: client_ping } },
        {
          session_name: client.client_data.network.sessionName,
          syncPing: { $lt: client_ping },
        }
      );
    return context;
  };
};

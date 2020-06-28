// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from "@feathersjs/feathers";
import IClientForm from "../Models/Interfaces/IClientForm";
import getPing from "../modules/helpers/create_ping";
import validateClientForm from "../modules/helpers/validate_client_form";
import {
  default_params,
  addToDefaultParams,
} from "../modules/helpers/basic-default-service-params";
import R from "ramda";

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
    await setPing(client, app.service("clients"), app.service("sessions"));
    return context;
  };
};

export const setPing = async (
  client: IClientForm,
  client_service: any,
  session_service: any
) => {
  const client_ping = R.applyTo(getPing(client.sended_utc_timestamp));
  await client_ping(patchClients(client_service, client.client_data.id));
  await client_ping(
    patchSessions(session_service, client.client_data.network.session_name)
  );
};

export const patchClients = (service: any, id: string) => async (
  client_ping: number
) =>
  service.patch(
    id,
    {
      $set: { ping: client_ping },
    },
    default_params
  );

export const patchSessions = (service: any, sessionName: string | null) => async (
  client_ping: number
) =>
  service.patch(
    null,
    { $set: { syncPing: client_ping } },
    addToDefaultParams({
      query: {
        session_name: sessionName,
        syncPing: { $lt: client_ping },
      },
    })
  );

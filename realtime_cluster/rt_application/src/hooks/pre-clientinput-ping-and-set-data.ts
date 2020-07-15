// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext, Application, Paginated } from "@feathersjs/feathers";
import IClientMessage from "../models/Interfaces/clients-inputs/IClientMessage";
import createPingAndSessionDataClientinput, { getPing } from "../modules/client-input/create-ping-and-session-data-clientinput";
import { addToDefaultParams } from "../modules/helpers/basic-default-service-params";
import { IClientConnection } from "../models/Interfaces/clients/IClientConnection";

// ******************************************
// Validiert die mindest Anforderungen der Form und pruft den ping
// falls der ping > syncPing in der zugewiesenen Session so wird dieser verwendet
// fuge alle rt_server bedingten Daten ein
// ******************************************

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    const { data, app } = context as {data: IClientMessage, app: Application};
    data.ping = getPing(data.sended_utc_timestamp)
    const client: Paginated<IClientConnection> = await app.service('clients').find(addToDefaultParams({ query: { token: data.token } }));
    data.client_id = client.data[0].user_name;
    data.session_name = await createPingAndSessionDataClientinput(data, app.service("sessions"), client.data[0]);
    return context;
  };
};

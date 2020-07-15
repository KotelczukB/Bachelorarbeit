// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext, Application } from "@feathersjs/feathers";
import IClientMessage from "../models/Interfaces/clients-inputs/IClientMessage";
import createPingAndSessionDataClientinput, { getPing } from "../modules/client-input/create-ping-and-session-data-clientinput";

// ******************************************
// Validiert die mindest Anforderungen der Form und pruft den ping
// falls der ping > syncPing in der zugewiesenen Session so wird dieser verwendet
// ******************************************

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    const { data, app } = context as {data: IClientMessage, app: Application};
    data.ping = getPing(data.sended_utc_timestamp)
    data.session_name = await createPingAndSessionDataClientinput(data, app.service("sessions"), app.service('clients'));
    return context;
  };
};

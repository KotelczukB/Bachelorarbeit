import IClientMessage from "../../models/Interfaces/clients-inputs/IClientMessage";
import { IMessageToBackend } from "../../models/Interfaces/backend-inputs/IMessageToBackend";

export default (rt_server_url: string) => (param: IClientMessage[]): IMessageToBackend => createBackendInput(rt_server_url, param);

export const createBackendInput = (url: string, param: IClientMessage[]): IMessageToBackend => {
  return {
    client_inputs: param,
    session_name: param[0].session_name,
    rt_server: url
  };
};

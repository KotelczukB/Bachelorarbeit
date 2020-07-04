import IClientMessage from "../../models/Interfaces/clients-inputs/IClientMessage";
import { IMessageToBackend } from "../../models/Interfaces/backend-inputs/IMessageToBackend";

export default (param: IClientMessage[]): IMessageToBackend => createBackendInput(param);

export const createBackendInput = (param: IClientMessage[]) => {
  return {
    client_inputs: param,
    session_name: param[0].session_name,
  };
};

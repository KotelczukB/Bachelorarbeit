import IClientMessage from "../../models/Interfaces/clients-inputs/IClientMessage";
import { IBackendMessage } from "../../models/Interfaces/backend-inputs/IBackendMessage";

export default (param: IClientMessage[]): IBackendMessage => createBackendInput(param);

export const createBackendInput = (param: IClientMessage[]) => {
  return {
    client_inputs: param,
    session_name: param[0].session_name,
  };
};

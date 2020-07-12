import IClientMessage from "../clients-inputs/IClientMessage";

export interface IMessageToBackend {
  client_inputs: IClientMessage[];
  backend_session_name: string;
}
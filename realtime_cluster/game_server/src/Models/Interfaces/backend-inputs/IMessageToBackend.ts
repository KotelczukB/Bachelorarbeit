import IClientMessage from "../clients-inputs/IClientMessage";

export interface IMessageToBackend {
  client_inputs: IClientMessage[];
  session_name: string;
}
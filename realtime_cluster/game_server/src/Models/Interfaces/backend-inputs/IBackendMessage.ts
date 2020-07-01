import IClientMessage from "../clients-inputs/IClientMessage";

export interface IBackendMessage {
  client_inputs: IClientMessage[];
  session_name: string;
}
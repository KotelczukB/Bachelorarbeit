import IClientMessage from "../clients-inputs/IClientMessage";

export interface IMessageToBackend {
  client_inputs: (IClientMessage | undefined)[];
  session_name: string;
  rt_server: string
}
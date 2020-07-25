import IClientMessage from "../clients-inputs/IClientMessage";

export interface IMessageToBackend {
  client_inputs: (IClientMessage | undefined)[];
  session_name: string;
  backend_url: string;
  channel: string;
  rt_server: string;
  created_at: number;
  newest_at: number;
}
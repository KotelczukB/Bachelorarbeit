import { IPlayerGameSnapShot } from "./IPlayerGameSnapShot";


export interface IPlayerInput {
  session_name: string,
  rt_server: string,
  backend_channel: string,
  client_inputs: IClientInput[]
  [idx: string]: any;
}

export interface IClientInput {
  [dix: string]: any,
  id: number,
  rang: number,
  ping: number,
  client_id: string,
  session_name: string,
  app: IPlayerGameSnapShot,
  token: string
}

import { IGameData } from "./IGameData";

export default interface IClientMessage {
  rang: number,
  created_utc_timestamp: number,
  sended_utc_timestamp: number,
  ping: number,
  client_id: number,
  session_name: string,
  game: IGameData,
  [idx: string]: any
}
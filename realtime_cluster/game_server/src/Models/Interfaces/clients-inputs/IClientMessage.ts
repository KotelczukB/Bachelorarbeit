import { IGameData } from "./IGameData";
import { IExternType } from "../IExternType";

export default interface IClientMessage {
  rang: number,
  type: IExternType,
  created_utc_timestamp: number,
  sended_utc_timestamp: number,
  ping: number,
  client_id: number,
  session_name: string,
  target_channel_name: string,
  game: IGameData,
  [idx: string]: any
}
import { IExternalAppData } from "../IExtAppData";
import { _ExternType } from "../_ExternType";

export default interface IClientMessage {
  rang: number;
  type: _ExternType;
  created_utc_timestamp: number;
  sended_utc_timestamp: number;
  ping: number;
  client_id: number;
  session_name: string;
  target_channel_name: string;
  app: IExternalAppData;
  [idx: string]: any;
}

export default interface IClientMessage {
  rang: number;
  type: string;
  created_utc_timestamp: number;
  sended_utc_timestamp: number;
  ping: number;
  client_id: string | null;
  session_name: string;
  target_channel_name: string;
  app: {[idx: string]: any} | null;
  token: string | null;
  [idx: string]: any;
}
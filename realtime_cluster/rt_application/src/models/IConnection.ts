export interface IConnection {
  [idx: string]: any;
  target_channel: string;
  session_name: string;
  user_name: string;
  backend_url: string;
  type: string;
}

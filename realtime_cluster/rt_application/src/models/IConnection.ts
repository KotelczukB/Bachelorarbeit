export interface IConnection {
  [idx: string]: any;
  target_channel: string;
  session_name: string;
  user_name: string;
  own_url: string;
  backend_url: string;
  type: string;
  min_players: number;
  max_players: number;
  interval: number;
}

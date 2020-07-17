export interface IChatMessage {
  user: string;
  msg: string;
  intern: boolean;
  channel: string;
  token: string;
  created_at: number;
  [idx: string]: any;
}

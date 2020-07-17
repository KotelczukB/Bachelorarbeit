export interface IChatMessage {
  user: string;
  msg: string;
  intern: boolean;
  channel: string;
  token: string;
  [idx: string]: any;
}

export default interface ISession {
  createdAt: Date,
  session_name: string,
  activ: boolean,
  started: boolean,
  clients_channel: string,
  backends_channel: string,
  clients: string[],
  backend: string[],
  syncPing: number,
  [idx: string]: any
}
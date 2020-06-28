export default interface ISession {
  createdAt: Date,
  session_name: string,
  activ: boolean, // am leben
  started: boolean, // backend ist drin
  closed: boolean, // spiel hat begonnen
  clients_channel: string,
  backends_channel: string,
  clients: string[],
  backend: string[],
  syncPing: number,
  [idx: string]: any
}
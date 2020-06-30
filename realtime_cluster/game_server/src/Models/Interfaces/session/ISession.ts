import { SessionState } from "../../enums/SessionState";

export default interface ISession {
  createdAt: Date,
  session_name: string,
  state: SessionState, // active, running, full, closed
  clients_to_start: number;
  clients_channel: string,
  backends_channel: string,
  clients: string[],
  backend: string[],
  syncPing: number,
  [idx: string]: any
}
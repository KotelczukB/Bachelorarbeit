import { SessionState } from "../../enums/SessionState";

export default interface ISession {
  createdAt: Date;
  session_name: string;
  state: SessionState; // active, running, full, closed
  min_clients: number;
  max_clients: number;
  clients_channel: string;
  backends_channel: string;
  interval_value: number;
  clients: string[];
  backend: string[];
  syncPing: number;
  newest_update: number;
  [idx: string]: any;
}

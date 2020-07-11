import { _RealTimeAppType } from "./real-time/_RealTimeAppType";
import { _RealTimeAppStatus } from "./real-time/_RealTimeAppStatus";
import { IRTServer } from "./real-time/IRTServer";

export interface IClientLoginAnswer {
  user_name: string;
  token: string;
  backend_url: string;
  rt_servers: IRTServer[];
}

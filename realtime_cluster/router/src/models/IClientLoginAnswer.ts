import { _RealTimeAppType } from "./real-time/_RealTimeAppType";
import { _RealTimeAppStatus } from "./real-time/_RealTimeAppStatus";
import { IRTServerSetupApp } from "./real-time/IRTServerSetupApp";

export interface IClientLoginAnswer {
  user_name: string;
  token: string;
  backend_url: string;
  rt_servers: IRTServerSetupApp[];
}

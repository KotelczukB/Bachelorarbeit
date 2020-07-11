import { _RealTimeAppStatus } from "./_RealTimeAppStatus";
import { _RealTimeAppType } from "./_RealTimeAppType";

export interface IRTServer {
  serverURL: string;
  status: _RealTimeAppStatus;
  type: _RealTimeAppType;
  [idx: string]: any
}
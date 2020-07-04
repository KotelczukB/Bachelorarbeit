import { _RealTimeAppType } from "./_RealTimeAppType";
import { _RealTimeAppStatus } from "./_RealTimeAppStatus";

export interface IRealTimeApp {
  type: _RealTimeAppType;
  connection_string: string;
  status: _RealTimeAppStatus;
  checked_on: Date;
  [idx: string]: any;
}

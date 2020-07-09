import { _BasicState } from "./SessionState";
import { _RTServerType } from "./RTServerType";

export interface IRTServer {
  serverURL: string;
  status: _BasicState;
  type: _RTServerType;
  [idx: string]: any
}
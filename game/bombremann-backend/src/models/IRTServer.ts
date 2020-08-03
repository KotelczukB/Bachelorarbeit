import { _BasicState } from "./_SessionState";
import { _RTServerType } from "./_RTServerType";

export interface IRTServer {
  serverURL: string;
  state: _BasicState;
  type: _RTServerType;
  [idx: string]: any
}
import { IExternalAppData } from "../IExtAppData";
import { _ExternType } from "../_ExternType";

export interface IBackendInput {
  type: _ExternType;
  externalAppData: IExternalAppData;
  ownURL: string;
  session_name: string;
  close_session: boolean;
  traget_channel_name: string;
}

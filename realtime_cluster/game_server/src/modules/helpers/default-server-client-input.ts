import IClientMessage from "../../models/Interfaces/clients-inputs/IClientMessage"
import getTimeStamp from "./getTimeStamp"
import { IBackendInput } from "../../models/Interfaces/backend-inputs/IBackendInput"
import { _ExternType } from "../../models/Interfaces/_ExternType"

// Input generalisierung nur Chat wird weiter geschickt

export const appServerClientsInputs = (input: IBackendInput | IClientMessage): IClientMessage => {
  return {
    client_id: 'server',
    created_utc_timestamp: getTimeStamp(),
    ping: NaN,
    rang: NaN,
    sended_utc_timestamp: getTimeStamp(),
    session_name: input.session_name,
    type: _ExternType.server,
    app: {
      ...input.externalAppData
    },
    target_channel_name: '' 
  }
}

export const chatServerClientsInputs = (input: IBackendInput | IClientMessage): IClientMessage => {
  return {
    client_id: 'server',
    created_utc_timestamp: getTimeStamp(),
    ping: NaN,
    rang: NaN,
    sended_utc_timestamp: getTimeStamp(),
    session_name: input.session_name,
    type: _ExternType.server,
    app: {
      ...input.externalAppData,
      variable: null,
      constant: null
    },
    target_channel_name: '' 
  }
}
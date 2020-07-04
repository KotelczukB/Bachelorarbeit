import { IBackendInput } from "../../models/Interfaces/backend-inputs/IBackendInput";
import IClientMessage from "../../models/Interfaces/clients-inputs/IClientMessage";
import { _ExternType } from "../../models/Interfaces/_ExternType";
import { appServerClientsInputs, chatServerClientsInputs } from "../helpers/default-server-client-input";
import { _AppType } from "../../models/Interfaces/_AppType";

export default (input: IBackendInput, appType: _AppType): IClientMessage => appType === _AppType.chat ? chatServerClientsInputs(input) : appServerClientsInputs(input)
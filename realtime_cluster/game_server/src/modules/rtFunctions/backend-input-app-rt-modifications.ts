import { IBackendInput } from "../../models/Interfaces/backend-inputs/IBackendInput";
import IClientMessage from "../../models/Interfaces/clients-inputs/IClientMessage";
import { _ExternType } from "../../models/Interfaces/_ExternType";
import defaultServerClientInput from "../helpers/default-server-client-input";

export default (input: IBackendInput): IClientMessage => defaultServerClientInput(input)
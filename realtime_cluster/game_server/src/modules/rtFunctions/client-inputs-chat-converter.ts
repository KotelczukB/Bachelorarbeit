import IClientMessage from "../../models/Interfaces/clients-inputs/IClientMessage";
import defaultServerClientInput from "../helpers/default-server-client-input";

export default (message: IClientMessage) => defaultServerClientInput(message)
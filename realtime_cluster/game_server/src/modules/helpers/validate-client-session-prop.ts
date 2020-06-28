import {
  IClient,
  IClientConnection,
} from "../../Models/Interfaces/IClientForm";

export default (network: IClientConnection): number =>
  !network.target_channel && !network.session_name
    ? 1
    : !network.target_channel && network.session_name
    ? 0
    : network.target_channel && !network.session_name
    ? -1
    : -1;

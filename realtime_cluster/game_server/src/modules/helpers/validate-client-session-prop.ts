import {
  IClient,
  IClientConnection,
} from "../../Models/Interfaces/IClientForm";

export default (network: IClientConnection): number =>
  !network.targetChannel && !network.sessionName
    ? 1
    : !network.targetChannel && network.sessionName
    ? 0
    : network.targetChannel && !network.sessionName
    ? -1
    : -1;

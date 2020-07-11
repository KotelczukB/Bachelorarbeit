import { IClientConnection } from "./IClientConnection";

export interface IClient {
  token: string | null,
  network: IClientConnection
}
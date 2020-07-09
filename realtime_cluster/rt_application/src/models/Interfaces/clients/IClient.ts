import { IClientConnection } from "./IClientConnection";

export interface IClient {
  id: string,
  token: string | null,
  network: IClientConnection
}
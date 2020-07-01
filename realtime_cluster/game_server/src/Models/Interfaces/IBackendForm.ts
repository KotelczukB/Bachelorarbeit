import { IBackend } from "./backends/IBackend";

export default interface IBackendForm {
  createdAt: Date;
  backendData: IBackend;
  gameData: IGameData;
}

// *****************************************************
// Backend bestimmt in welchen intervalen die Clients verpflichetet sind einen Update zu seinden
// Backend bestimmt die minimale Anzahl an Clients um eine Session zu beginnen
// *****************************************************

export interface IGameData {
  intervall: number;
  clientsToStart: number;
  sync: ISyncData;
  static: IStaticData;
}

export interface ISyncData {}

export interface IStaticData {}

export interface IBackendNetwork {}

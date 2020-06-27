export default interface IBackendForm {
  createdAt: Date,
  backendData: IBackend,
}

export interface IBackend {
  id: string,
  token: string,
  network: IBackendNetwork
  clients: IClientAuth[],
  gameData: IGameData
}

export interface IGameData{
  sync: ISyncData
  static: IStaticData
}

export interface ISyncData {

}

export interface IStaticData {
  
}

export interface IBackendNetwork {
  ownURL: string,
  targetChannel: string,
  sessionName: string
}

export interface IClientAuth {
  id: string,
  backendToken: string,
  auth: boolean

}
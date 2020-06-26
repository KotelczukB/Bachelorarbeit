export default interface IBackendForm {
  createdAt: Date,
  backendData: IBackend,
}

export interface IBackend {
  id: string,
  token: string,
  network: IBackendNetwork
}

export interface IBackendNetwork {
  ownURL: string,
  targetChannel: string,
  sessionName: string
}
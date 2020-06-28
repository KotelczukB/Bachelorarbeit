export default interface IClientForm {
  created_utc_timestamp: number,
  sended_utc_timestamp: number,
  client_data: IClient,
  game: IGameData,
  custom: ICustomData | undefined
  [idx: string]: any
}

export interface IClientConnection {
  target_server_URL: string,
  target_channel: string,
  session_name: string | null,
  backend_token: string
  backend_auth: boolean
}

// *******************************************************************************************************************
// Verbindugsdaten um das entsprechende Backend ansprechen zu konnen und bei verlorener Verbindung den Client wieder 
// einordnen zu konnen. und dem gleichem Channel zu zuweisen
// *******************************************************************************************************************

export interface IClient {
  id: string,
  token: string | null,
  ping: number,
  network: IClientConnection
}

// *******************************************************************************************************************
// sequenzed data muss an die Latenz und die actions Reihenfolge angepasst werden basierend auf dem createdAt
// stable data sind Daten die nicht der Latenz oder ausfuhrungsreihenfolge obligen. Diese werden in gleicher Form weiter gegeben
// die Richtigkeit der Daten wird nicht gepruft, sondern nur die Zeitliche Reihenfolge  
// An dieser Stelle kann der Client selbst entscheiden welche Daten, wie behandelt werden durfen. Naturlich werden die jeweilge Verarbeitung 
// entsprechend an das Backend weitergegeben.
// *******************************************************************************************************************
export interface IGameData {
  sequenzed: ISequenzedData
  stable: IStableData
}

export interface IStableData {
  [idx: string]: string
}

export interface ISequenzedData {
  [idx: string]: string
}

export interface ICustomData {
  [idx: string]: string
}
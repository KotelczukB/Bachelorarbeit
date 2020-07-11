// *******************************************************************************************************************
// Verbindugsdaten um das entsprechende Backend ansprechen zu konnen und bei verlorener Verbindung den Client wieder 
// einordnen zu konnen. und dem gleichem Channel zu zuweisen
// *******************************************************************************************************************

export interface IClientConnection {
  backend_server_URL: string,
  target_channel: string,
  session_name: string | null,
  backend_token: string
}
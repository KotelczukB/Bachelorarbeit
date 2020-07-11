// *******************************************************************************************************************
// Verbindugsdaten um das entsprechende Backend ansprechen zu konnen und bei verlorener Verbindung den Client wieder 
// einordnen zu konnen. und dem gleichem Channel zu zuweisen
// *******************************************************************************************************************

export interface IClientConnection {
  user_name: string
  backend_url: string,
  target_channel: string,
  session_name: string | null,
  token: string
}
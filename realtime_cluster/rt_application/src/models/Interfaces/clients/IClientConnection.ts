export interface IClientConnection {
  user_name: string
  backend_url: string,
  target_channel: string,
  session_name: string | null,
  token: string
}
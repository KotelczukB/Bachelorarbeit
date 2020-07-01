export interface IBackend {
  id: string,
  token: string,
  interval_value: number,
  ownURL: string,
  max_session_clients: number,
  min_session_clients: number
}
import ISessionCreate from "../../models/Interfaces/session/ISessionCreate"

export default (backendURL: string, client_id: string): ISessionCreate => { return {
  name: `Session-${+new Date()}`,
  backendURL,
  client_id,
  interval: 0
};}
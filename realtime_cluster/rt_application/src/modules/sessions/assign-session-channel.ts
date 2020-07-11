import { IClientConnection } from "../../models/Interfaces/clients/IClientConnection";


export default (app: IClientConnection , session: string, channel: string): IClientConnection => {
  app = {
    ...app,
    target_channel: channel,
    session_name: session
  }
  return app;
}
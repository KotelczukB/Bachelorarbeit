import { IClient } from "../../models/Interfaces/clients/IClient";

export default (app: IClient , session: string, channel: string): IClient => {
  app.network = {
    ...app.network,
    target_channel: channel,
    session_name: session
  }
  return app;
}
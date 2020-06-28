import { IClient } from "../../Models/Interfaces/IClientForm";
import { IBackend } from "../../models/Interfaces/IBackendForm";

export default (app: IClient | IBackend , session: string, channel: string): IClient | IBackend => {
  app.network = {
    ...app.network,
    target_channel: channel,
    session_name: session
  }
  return app;
}
import { IClient } from "../../Models/Interfaces/IClientForm";
import { IBackend } from "../../models/Interfaces/IBackendForm";

export const assignSessionAndChannelName = (app: IClient | IBackend , session: string, channel?: string): IClient | IBackend => {
  app.network = {
    ...app.network,
    targetChannel: channel ?? session,
    sessionName: session
  }
  return app;
}
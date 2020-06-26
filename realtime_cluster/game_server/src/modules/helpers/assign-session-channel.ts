import { IConnectionData } from "../../Models/Interfaces/IClientForm";

export const assignSessionAndChannelName = (client: IConnectionData, session: string, channel?: string) => {
  return {
    ...client,
    targetChannel: channel ?? session,
    sessionName: session
  }
}
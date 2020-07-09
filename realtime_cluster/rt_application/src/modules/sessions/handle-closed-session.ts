import { Application } from "@feathersjs/feathers";
import ISession from "../../models/Interfaces/session/ISession";
import { _AppType } from "../../models/Interfaces/_AppType";
import collectChatSendToBackend from "../rtFunctions/collect-chat-send-to-backend";

export default async (
  data: ISession,
  app: Application,
  appType: _AppType
): Promise<void | null> => appType === _AppType.chat ? await collectChatSendToBackend(
  app.service("client-inputs"),
  data.session_name,
  data.backend[0]
) : null;

export const leaveChannel = (channel_name: string, app: Application) =>
  app
    .channel(channel_name)
    .connections.forEach((conn: any) => app.channel(channel_name).leave(conn));

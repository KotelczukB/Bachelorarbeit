// short way to get UTC timestamp

import { addToDefaultParams } from "../helpers/basic-default-service-params";
import IClientMessage from "../../models/Interfaces/clients-inputs/IClientMessage";
import getTimeStamp from "../helpers/getTimeStamp";

export default async (
  client: IClientMessage,
  session_service: any
): Promise<number> =>
  await patchSessions(
    session_service,
    client.client_data.session_name,
    getPing(client.sended_utc_timestamp)
  );

export const getPing = (input_timestamp: number): number =>
  +new Date() - input_timestamp;

export const patchSessions = async (
  service: any,
  sessionName: string | null,
  client_ping: number
): Promise<number> =>
  service.patch(
    {},
    { $set: { syncPing: client_ping, newest_update: getTimeStamp()} },
    addToDefaultParams({
      query: {
        session_name: sessionName,
        syncPing: { $lt: client_ping },
      },
    })
  ).then((resp: any) => client_ping);

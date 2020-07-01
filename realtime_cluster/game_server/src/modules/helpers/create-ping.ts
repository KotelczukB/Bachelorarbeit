// short way to get UTC timestamp

import { addToDefaultParams } from "./basic-default-service-params";
import IClientInput from "../../models/Interfaces/clients-inputs/IClientInput";

export default async (
  client: IClientInput,
  session_service: any
): Promise<number> =>
  await patchSessions(
    session_service,
    client.client_data.network.session_name,
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
    { $set: { syncPing: client_ping } },
    addToDefaultParams({
      query: {
        session_name: sessionName,
        syncPing: { $lt: client_ping },
      },
    })
  ).then((resp: any) => client_ping);

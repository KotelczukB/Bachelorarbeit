// short way to get UTC timestamp

import IClientForm from "../../Models/Interfaces/IClientForm";
import R from "ramda";
import { default_params, addToDefaultParams } from "./basic-default-service-params";

export default async (
  client: IClientForm,
  client_service: any,
  session_service: any
  ) => {
    const client_ping = R.applyTo(getPing(client.sended_utc_timestamp));
    await client_ping(patchClients(client_service, client.client_data.id));
    await client_ping(
      patchSessions(session_service, client.client_data.network.session_name)
      );
    };
    
export const getPing = (input_timestamp: number) =>  (+ new Date()) - input_timestamp 

export const patchClients = (service: any, id: string) => async (
  client_ping: number
) =>
  service.patch(
    id,
    {
      $set: { ping: client_ping },
    },
    default_params
  );

export const patchSessions = (service: any, sessionName: string | null) => async (
  client_ping: number
) =>
  service.patch(
    null,
    { $set: { syncPing: client_ping } },
    addToDefaultParams({
      query: {
        session_name: sessionName,
        syncPing: { $lt: client_ping },
      },
    })
  );
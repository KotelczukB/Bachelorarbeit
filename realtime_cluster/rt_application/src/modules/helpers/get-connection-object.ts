import { _ExternType } from "../../models/Interfaces/_ExternType";
import { Application, Paginated } from "@feathersjs/feathers";
import { addToDefaultParams } from "./basic-default-service-params";
import { IBackend } from "../../models/Interfaces/backends/IBackend";
import { IConnection } from "../../models/IConnection";
import ISession from "../../models/Interfaces/session/ISession";
import { _SessionState } from "../../models/enums/_SessionState";

export default async (connection: IConnection, app: Application): Promise<void | { backend_channel: string; client_channel: string }> =>
  connection.type === _ExternType[_ExternType.client]
    ? await handleClientConnection(connection, app.service('sessions'))
    : await handleBackendSocketConnection(connection, app.service("backends"));

export const handleBackendSocketConnection = async (
  connection: IConnection,
  backend_service: any
): Promise<void> => {
  await createBackend(backend_service, connection);
};

// Get Session die fur den Client zugewiesen wurde und hole backend_channel und client_channel raus
export const handleClientConnection = async (
  connection: IConnection,
  session_service: any
): Promise<{ backend_channel: string; client_channel: string }> =>
  await session_service
    .find(
      addToDefaultParams({query: { clients: connection.user_name}})
    )
    .then((res: Paginated<ISession>) => {
      return res.data[0]})
    .then((elem: ISession) => {
      return {
        backend_channel: elem.backends_channel,
        client_channel: elem.clients_channel,
      };
    }).catch((err: any) => {
      console.log(`Client not registert for socket connection Error: ${err}`);
  });

// erstelle ein neues Backend
export const createBackend = async (
  backend_service: any,
  data: IConnection
): Promise<Paginated<IBackend>> =>
  await backend_service.create({
    ownURL: data.own_url,
    interval_value: data.interval,
    min_session_clients: data.min_players,
    max_session_clients: data.max_players,
  });

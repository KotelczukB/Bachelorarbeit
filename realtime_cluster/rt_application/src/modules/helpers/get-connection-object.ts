import { _ExternType } from "../../models/Interfaces/_ExternType";
import { Application, Paginated } from "@feathersjs/feathers";
import { addToDefaultParams } from "./basic-default-service-params";
import { IBackend } from "../../models/Interfaces/backends/IBackend";
import { IConnection } from "../../models/IConnection";
import ISession from "../../models/Interfaces/session/ISession";
import { _SessionState } from "../../models/enums/_SessionState";
import logger from "../../logger";

export default async (connection: IConnection, app: Application): Promise<{ backend_channel: string; client_channel: string }> =>
     await handleClientConnection(connection, app.service('sessions'))



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
      logger.error(`Client not registered for socket connection Error: ${err.message}`);
  });

import { addToDefaultParams } from "../helpers/basic-default-service-params";
import IClientMessage from "../../models/Interfaces/clients-inputs/IClientMessage";
import { Paginated } from "@feathersjs/feathers";
import { IClientConnection } from "../../models/Interfaces/clients/IClientConnection";
import ISession from "../../models/Interfaces/session/ISession";
import logger from "../../logger";

//************************************** */
// set new ping if this is the higher one
// return session name
//************************************** */

export default async (
  client_message: IClientMessage,
  session_service: any,
  client: IClientConnection
): Promise<string> =>
  await patchSessions(session_service, client, client_message);

export const getPing = (input_timestamp: number): number =>
  +new Date() - input_timestamp;

export const patchSessions = async (
  session_service: any,
  client: IClientConnection,
  client_message: IClientMessage
): Promise<string> =>
  await session_service
    .find(
      addToDefaultParams({
        query: { session_name: client.session_name },
      })
    )
    .then((session: Paginated<ISession>) => {
      session_service.patch(session.data[0]._id, {
        syncPing: client_message.ping,
      });
      return session.data[0].session_name;
    })
    .catch((err: any) => logger.error(`Exception on session set Ping ${err.message}`));

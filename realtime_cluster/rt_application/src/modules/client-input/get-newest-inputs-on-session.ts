import IClientMessage from "../../models/Interfaces/clients-inputs/IClientMessage";
import { addToDefaultParams } from "../helpers/basic-default-service-params";
import { Paginated } from "@feathersjs/feathers";
import ISession from "../../models/Interfaces/session/ISession";
//********************************************* */
// Suche session -> hole alle client namen -> suche den neusten Input fur jeden client 
//********************************************* */
export default async (
  session_service: any,
  client_inputs_service: any,
  sesssion: string,
  sortDirection: number
): Promise<IClientMessage[]>=>
  await session_service
    .find(addToDefaultParams({ query: { session_name: sesssion } }))
    .then(async (sess: Paginated<ISession>) =>
      await Promise.all(sess.data[0].clients.map(async (user: string) =>
        await getClientInputOnClient(
          client_inputs_service,
          user,
          sess.data[0].session_name,
          sortDirection
        ).then((client_inp: Paginated<IClientMessage>) => client_inp.data[0])
      ))
    );

export const getClientInputOnClient = async (
  client_inputs_service: any,
  client_id: string,
  session_name: string,
  sortDirection: number
): Promise<Paginated<IClientMessage>> => 
  await client_inputs_service.find(
    addToDefaultParams({
      query: {
        client_id: client_id,
        session_name: session_name,
        $sort: { sended_utc_timestamp: sortDirection },
      },
    })
  );


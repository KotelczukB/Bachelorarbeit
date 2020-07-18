import { addToDefaultParams } from "../helpers/basic-default-service-params";
import IClientMessage from "../../models/Interfaces/clients-inputs/IClientMessage";
import fetch from "node-fetch";

export default async (
  client_input_service: any,
  session_name: string,
  backend_url: string
): Promise<void> => {
  await getAllClientMessages(client_input_service, session_name).then(
    (messeges: IClientMessage[]) =>
      fetch(`${backend_url}/chat_backup`, {
        method: "POST",
        body: JSON.stringify(messeges),
      }).catch((err: any) => {
        console.log(err);
      })
  );
};

export const getAllClientMessages = async (
  client_input_service: any,
  session_name: string
): Promise<IClientMessage[]> =>
  await client_input_service.find(
    addToDefaultParams({ query: { session_name: session_name } })
  );

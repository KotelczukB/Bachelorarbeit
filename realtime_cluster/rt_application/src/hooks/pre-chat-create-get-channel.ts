
import {
  Hook,
  HookContext,
  Application,
  Paginated,
} from "@feathersjs/feathers";
import { IChatMessage } from "../models/Interfaces/chat/IChatMessage";
import { getType } from "../modules/helpers/get-envs";
import { _AppType } from "../models/Interfaces/_AppType";
import ISession from "../models/Interfaces/session/ISession";
import { addToDefaultParams } from "../modules/helpers/basic-default-service-params";
import { IClientConnection } from "../models/Interfaces/clients/IClientConnection";

//**************************************** */
// check ob client exsistiert

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    const { data, app } = context as { data: IChatMessage; app: Application };
    if (getType() !== _AppType[_AppType.chat]) {
      throw new Error("Chat functionality not provided");
    }
      const client: Paginated<IClientConnection> = await app
        .service("clients")
        .find(addToDefaultParams({ query: { token: data.token } }))
        .catch((err: any) => console.log(err));
      if (client.data.length < 1 || client.data[0].user_name !== data.user)
        throw new Error("Requested client not found");
      const session: Paginated<ISession> = await app
        .service("sessions")
        .find(
          addToDefaultParams({
            query: {
              session_name: client.data[0].session_name,
              clients: data.user,
            },
          })
        )
        .catch((err: any) => console.log(err));
      if (session.data.length < 1 || !session.data[0])
        throw new Error("Requested session not found");
      context.data.channel = session.data[0].clients_channel;
    return context;
  };
};

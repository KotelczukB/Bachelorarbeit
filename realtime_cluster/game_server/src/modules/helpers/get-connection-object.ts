import IClientMessage from "../../models/Interfaces/clients-inputs/IClientMessage";
import { IBackendInput } from "../../models/Interfaces/backend-inputs/IBackendInput";
import { IExternType } from "../../models/Interfaces/IExternType";
import { Application } from "@feathersjs/feathers";
import { addToDefaultParams } from "./basic-default-service-params";

export default async (
  connection: IClientMessage | IBackendInput,
  app: Application
) =>
  connection.type === IExternType.client
    ? await app
        .service("clients")
        .find(
          addToDefaultParams({
            query: {
              id: (connection as IClientMessage).client_id,
              session_name: (connection as IClientMessage).session_name,
            },
          })
        )
    : await app
        .service("backends")
        .find(
          addToDefaultParams({
            query: { ownURL: (connection as IBackendInput).ownURL },
          })
        );

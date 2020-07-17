import { IConnection } from "../../models/IConnection";
import { RealTimeConnection } from "@feathersjs/transport-commons/lib/channels/channel/base";
import { _ExternType } from "../../models/Interfaces/_ExternType";
import { addToDefaultParams } from "./basic-default-service-params";
import { Paginated } from "@feathersjs/feathers";
import { IBackend } from "../../models/Interfaces/backends/IBackend";

export default async (
  connection: IConnection,
  backend_service: any
): Promise<IBackend[]> => 
  await backend_service.find(addToDefaultParams({query: {ownURL: connection.backend_url}})).data

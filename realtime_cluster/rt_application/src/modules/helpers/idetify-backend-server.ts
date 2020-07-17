import { IConnection } from "../../models/IConnection";
import { _ExternType } from "../../models/Interfaces/_ExternType";
import { addToDefaultParams } from "./basic-default-service-params";
import { IBackend } from "../../models/Interfaces/backends/IBackend";

export default async (
  connection: IConnection,
  backend_service: any
): Promise<IBackend[]> => 
  await backend_service.find(addToDefaultParams({query: {own_url: connection.backend_url}}))

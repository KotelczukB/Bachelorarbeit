
import { addToDefaultParams } from "../helpers/basic-default-service-params";
import { IClientConnection } from "../../models/Interfaces/clients/IClientConnection";

export default async (
  service: any,
  client_name: string
): Promise<{ data: IClientConnection[]; [idx: string]: any } | undefined> =>
  service.find(addToDefaultParams({ query: { client_name: client_name } })).then(returnNullifEmpty());

export const returnNullifEmpty = () => (
  retrunObj: any
): { data: IClientConnection; [idx: string]: any } | undefined =>
  retrunObj.data.length < 1
    ? undefined
    : { data: retrunObj.data[0], _id: retrunObj.data[0]._id };

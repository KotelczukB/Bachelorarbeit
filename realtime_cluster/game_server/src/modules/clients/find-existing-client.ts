
import { addToDefaultParams } from "../helpers/basic-default-service-params";
import { IClient } from "../../models/Interfaces/clients/IClient";

export default async (
  service: any,
  client_id: string
): Promise<{ data: IClient[]; [idx: string]: any } | undefined> =>
  service.find(addToDefaultParams({ query: { id: client_id } })).then(returnNullifEmpty());

export const returnNullifEmpty = () => (
  retrunObj: any
): { data: IClient; [idx: string]: any } | undefined =>
  retrunObj.data.length < 1
    ? undefined
    : { data: retrunObj.data[0], _id: retrunObj.data[0]._id };

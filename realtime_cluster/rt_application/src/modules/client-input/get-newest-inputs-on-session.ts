import IClientMessage from "../../models/Interfaces/clients-inputs/IClientMessage";
import { addToDefaultParams } from "../helpers/basic-default-service-params";

export default async (
  service: any,
  sesssion: string,
  sortDirection: number
): Promise<IClientMessage[]> =>
  service.find(
    addToDefaultParams({
      query: {
        session_name: sesssion,
        $sort: { sended_utc_timestamp: sortDirection },
      },
    })
  ).then(initializeRang);

export const initializeRang = (inputs: IClientMessage[]): IClientMessage[] => inputs.sort(compareInputs).map(setRang)

export const setRang = (input: IClientMessage, idx: number) => {
  return {
    ...input,
    rang: idx
  }
}

export const compareInputs = (input_1: IClientMessage, input_2: IClientMessage): number => latency(input_1) < latency(input_2) ? -1 : latency(input_1) > latency(input_2) ? 1 : 0

export const latency = (input: IClientMessage): number => input.sended_utc_timestamp + input.ping
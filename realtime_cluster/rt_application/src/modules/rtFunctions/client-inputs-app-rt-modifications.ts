import IClientMessage from "../../models/Interfaces/clients-inputs/IClientMessage";
import { IMessageToBackend } from "../../models/Interfaces/backend-inputs/IMessageToBackend";

export default (rt_server_url: string) => async (param: Promise<IClientMessage>[]): Promise<IMessageToBackend | null> => await Promise.all(param).then(initializeRang).then(createBackendInput(rt_server_url));

export const createBackendInput = (url: string) => (param: (IClientMessage | undefined)[]): IMessageToBackend | null => {
  const infos = param.filter(elem => elem !== undefined)
  if(infos.length < 1)
    return null;
  if(infos[0] === undefined)
    return null;
  return {
    client_inputs: param,
    session_name: infos[0].session_name,
    rt_server: url
  };
};


export const initializeRang = (
  inputs: IClientMessage[]
): (IClientMessage | undefined)[] => inputs.sort(compareInputs).map(setRang);

export const setRang = (input: IClientMessage, idx: number) => {
  return {
    ...input,
    rang: idx,
  };
};

export const compareInputs = (
  input_1: IClientMessage,
  input_2: IClientMessage
): number =>
  latency(input_1) < latency(input_2)
    ? -1
    : latency(input_1) > latency(input_2)
    ? 1
    : 0;

export const latency = (input: IClientMessage): number => input.ping;

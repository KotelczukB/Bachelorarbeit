import IClientMessage from "../../models/Interfaces/clients-inputs/IClientMessage";
import { IMessageToBackend } from "../../models/Interfaces/backend-inputs/IMessageToBackend";
import getTimeStamp from "../helpers/getTimeStamp";

export default (rt_server_url: string, channel: string, backend_url: string) => (param: (IClientMessage | undefined)[]): IMessageToBackend | null => (createBackendMessage(rt_server_url, channel, initializeRang(param), backend_url));

export const createBackendMessage = (url: string, channel: string,  param: (IClientMessage | undefined)[], backend_url: string): IMessageToBackend | null => {
  const infos = param.filter(elem => elem !== undefined)
  if(infos.length < 1)
    return null;
  if(infos[0] === undefined)
    return null;
  return {
    client_inputs: param,
    session_name: infos[0].session_name,
    rt_server: url,
    channel: channel,
    created_at: getTimeStamp(),
    backend_url
  };
};


export const initializeRang = (
  inputs: (IClientMessage | undefined)[]
): (IClientMessage | undefined)[] => inputs.sort(compareInputs).map(setRang);

export const setRang = (input: IClientMessage | undefined, idx: number) => {
  if(input !== undefined)
  return {
    ...input,
    rang: idx,
  };
};

export const compareInputs = (
  input_1: (IClientMessage | undefined),
  input_2: (IClientMessage | undefined)
): number =>
  latency(input_1) < latency(input_2)
    ? -1
    : latency(input_1) > latency(input_2)
    ? 1
    : 0;

export const latency = (input: IClientMessage | undefined): number => input !== undefined ? input.ping : 0;

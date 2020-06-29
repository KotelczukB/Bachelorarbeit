import { IClient } from "../../Models/Interfaces/IClientForm";
import fetch from "node-fetch";

export default async (
  client: IClient
): Promise<boolean> =>
  await getAuthState(
    client,
    fetch,
    makeRequest,
    validateResponses,
    sendAuthRequest
  );

export const getAuthState = (
  client: IClient,
  fetches: any,
  mRequest: (fetches: any, client: IClient) => Promise<any>,
  validate: (prom: Promise<any>) => Promise<boolean>,
  sendRequest: (
    client: IClient,
    fetches: any,
    valid: (r: Promise<any>) => Promise<boolean>,
    requestFunc: (fetches: any, client: IClient) => Promise<any>
  ) => Promise<boolean>
): Promise<boolean> => sendRequest(client, fetches, validate, mRequest);

export const sendAuthRequest = async (
  client: IClient,
  fetch: any,
  validate: (result: Promise<any>) => Promise<boolean>,
  makeRequest: (fetch: any, client: IClient) => Promise<any>
): Promise<boolean> => makeRequest(fetch, client).then(validate);

export const makeRequest = async (fetch: any, client: IClient): Promise<any> =>
  fetch(client.network.target_server_URL, {
    method: "get",
    headers: { Bearer: client.network.backend_auth },
  }).then((res: any) => res.json());

export const validateResponses = async (
  promise: Promise<any>
): Promise<boolean> => promise.then((result: any) => result.data.success);

import fetch from "node-fetch";
import { IBackend } from "../../models/Interfaces/backends/IBackend";
import { addToDefaultParams } from "../helpers/basic-default-service-params";
import { IClientConnection } from "../../models/Interfaces/clients/IClientConnection";

export default async (
  backend_service: any,
  client: IClientConnection
): Promise<boolean> =>
  await getAuthState(
    backend_service,
    client,
    fetch,
    makeRequest,
    validateResponses,
    sendAuthRequest
  );

export const getAuthState = async (
  backend_service: any,
  client: IClientConnection,
  fetches: any,
  mRequest: (fetches: any, client: IClientConnection) => Promise<any>,
  validate: (result: Response, service: any) => Promise<boolean>,
  sendRequest: (
    backend_service: any,
    client: IClientConnection,
    fetches: any,
    valid: (result: Response, service: any) => Promise<boolean>,
    requestFunc: (fetches: any, client: IClientConnection) => Promise<any>
  ) => Promise<boolean>
): Promise<boolean> =>
  await sendRequest(backend_service, client, fetches, validate, mRequest);

export const sendAuthRequest = async (
  backend_service: any,
  client: IClientConnection,
  fetch: any,
  validate: (result: Response, service: any) => Promise<boolean>,
  makeRequest: (fetch: any, client: IClientConnection) => Promise<any>
): Promise<boolean> =>
  await makeRequest(fetch, client).then(async (elem) => await validate(elem, backend_service));

export const makeRequest = async (
  fetch: any,
  client: IClientConnection
): Promise<any> =>
  await fetch(`${client.backend_url}/players?token=${client.token}`, {
    method: "GET",
  });

export const validateResponses = async (
  result: Response,
  backend_service: any
): Promise<boolean> => result.ok ? result.json().then(updateBackend(backend_service)) : false
// zwischen methode wenn das Backend nicht existiert (key: url) dann erstelle ein neues
export const updateBackend = (backend_service: any) => async (
  body: any
): Promise<boolean> =>
  await findBackend(backend_service, body)
    .then(async (serach: { data: IBackend[]; [idx: string]: any }) =>
      serach.data !== undefined && serach.data.length > 0
        ? await updateBackendCall(backend_service, body)
        : new Error('backend not connected to the realtime server!')
    )
    .catch((err) => {console.log(err); return false});

// Schau ob das benotigte Backend angelegt ist
export const findBackend = async (
  backend_service: any,
  body: any
): Promise<{ data: IBackend[]; [idx: string]: any }> =>
  await backend_service.find(
    addToDefaultParams({
      query: {
        ownURL: body.backend_url,
      },
    })
  );


// Update Backend wenn der gebene min player Wert nicht vorhandnen ist
export const updateBackendCall = async (backend_service: any, body: any) =>
  await backend_service.patch(
    null,
    { min_session_clients: body.min_players },
    addToDefaultParams({
      query: {
        ownURL: body.backend_url,
        min_session_clients: { $nin: body.min_players },
      },
    })
  );

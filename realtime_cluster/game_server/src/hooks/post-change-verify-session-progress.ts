// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from "@feathersjs/feathers";
import ISession from "../models/Interfaces/session/ISession";
import { SessionState } from "../models/enums/SessionState";
import { IClient } from "../Models/Interfaces/IClientForm";
import fetch from "node-fetch";
import R from "ramda";

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    const { result, app } = context;
    const session: ISession = result;
    if (
      (minClientsRequirement(session) &&
        getRunningSessionState(session) === SessionState.activ) ||
      getRunningSessionState(session) !== SessionState.running
    ) {
      const result = await getAuthState(
        getClients(app.service("clients"), {query: {session_name: session.session_name}}), 
        fetch,
        createRequest,
        validateResponses,
        sendAuthRequest
      );
    }
    // schon einmal alle registriert worden
    if((minClientsRequirement(session) &&
      getRunningSessionState(session) === SessionState.activ) ||
      getRunningSessionState(session) === SessionState.running) {
      const result = await getAuthState(
        getClients(app.service("clients"), {query: {id: session.clients[session.clients.length -1]}}), 
        fetch,
        createRequest,
        validateResponses,
        sendAuthRequest
      );
      }
    return context;
  };
};

const getAuthState = (
  getClients: Promise<IClient[]>,
  fetches: any,
  cRequest: (fetches: any) => (client: IClient) => Promise<any>,
  validate: (
    prom: Promise<any>
  ) => Promise<{ auth: boolean; client_id: string }>,
  sendRequest: (
    fetches: any,
    c: IClient[],
    valid: (r: Promise<any>) => Promise<{ auth: boolean; client_id: string }>,
    requestFunc: (fetches: any) => (client: IClient) => Promise<any>
  ) => Promise<{ auth: boolean; client_id: string }>
): Promise<{ auth: boolean; client_id: string }> =>
  getClients.then((res: IClient[]) =>
    sendRequest(fetches, res, validate, cRequest)
  );

const sendAuthRequest = async (
  fetch: any,
  clients: IClient[],
  validate: (result: Promise<any>) => Promise<{ auth: boolean; client_id: string }>,
  createRequest: (fetch: any) => (c: IClient) => Promise<any>
): Promise<{ auth: boolean; client_id: string }> =>
  R.apply(validate, R.ap([createRequest(fetch)], clients));

const getClients = async (service: any, query: {}): Promise<IClient[]> =>
  service.find(query).then((res: any) => res.data);

const createRequest = (fetch: any) => async (clinet: IClient): Promise<any> =>
  fetch(clinet.network.target_server_URL, {
    method: "get",
    headers: { Bearer: clinet.network.backend_auth },
  }).then((res: any) => res.json());

const validateResponses = async (
  promise: Promise<any>
): Promise<{ auth: boolean; client_id: string }> =>
  promise.then((result: any) => {
    return { auth: result.data.success, client_id: result.data.id };
  });

const minClientsRequirement = (session: ISession) =>
  session.clientsToStart >= session.clients.length;

const getRunningSessionState = (session: ISession): SessionState =>
  session.activ
    ? !session.started && !session.closed
      ? SessionState.activ
      : session.started && !session.closed
      ? SessionState.running
      : session.started && session.closed
      ? SessionState.full
      : SessionState.dead
    : SessionState.dead;

const validateSessionRequierdProps = (session: ISession) =>
  session.backend &&
  session.clients_channel &&
  session.clients_channel &&
  session.clients &&
  session.activ;

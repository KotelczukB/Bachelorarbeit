import {
  ISessionSwitcher,
  ISwitcherSessionProps,
  ISwitcherSessionNameProps,
  ISwitcherClientProps,
} from "../../models/Interfaces/session/ISessionSwitcher";
import ISession from "../../models/Interfaces/session/ISession";
import { SessionState } from "../../models/enums/SessionState";
import app from "../../app";
import fetch, { Response } from "node-fetch";
import { addToDefaultParams } from "../helpers/basic-default-service-params";
import { IClient } from "../../models/Interfaces/clients/IClient";
import { Application } from "@feathersjs/feathers";

export const validateIncreaseSessionState = async (
  should_switch: (switches: ISessionSwitcher, session: ISession, app: Application) => Promise<boolean | null>,  switcher: ISessionSwitcher, app: Application
) => (session: ISession): Promise<SessionState> =>
  should_switch(switcher, session, app).then((answer: boolean | null) =>
    answer ? session.state + 1 : session.state
  );

// active
export const checkMinClientsCount = (
  obj: ISwitcherSessionProps
): ISwitcherSessionNameProps => {
  return {
    name: obj.session
      ? obj.session.clients_channel.length >= obj.session.min_clients
        ? obj.session?.session_name
        : null
      : null,
    target_channel_name: obj.session?.backends_channel,
    app: obj.app,
  };
};

export const getClientsOnSession = async (
  obj: ISwitcherSessionNameProps
): Promise<ISwitcherClientProps> =>
  app
    .service("clients")
    .find(addToDefaultParams({ query: { session_name: obj.name } }))
    .then((resp: any) => {
      return {
        clients: resp.data as IClient[],
        app: obj.app,
        target_channel_name: obj.target_channel_name,
      };
    });

export const sendStart = async (
  promise: Promise<ISwitcherClientProps>
): Promise<any | null> =>
  promise.then((obj: ISwitcherClientProps) => {
    return obj.clients && obj.clients.length > 1
      ? fetch(`${obj.clients[0].network.backend_server_URL}/start`, {
          method: "post",
          body: JSON.stringify({
            clients: obj.clients,
            target_channel_name: obj.target_channel_name,
          }),
        })
          .then((result: Response) => result.json())
          .catch((error: any) => {
            console.log(error);
            throw new Error(`Backend refused call with - ${error}`);
          })
      : null;
  });

export const changeSessionState = (
  resp: Promise<any | null>
): Promise<boolean> => resp.then((data: any) => data.change_session_state);

// running
export const getSessionName = (
  obj: ISwitcherSessionProps
): ISwitcherSessionNameProps => {
  return {
    name: obj.session ? obj.session.session_name : null,
    app: obj.app,
    target_channel_name: obj.session?.backends_channel,
  };
};

export const sendUpdate = (
  promise: Promise<ISwitcherClientProps>
): Promise<Response | null> =>
  promise.then((obj: ISwitcherClientProps) => {
    return obj.clients && obj.clients.length > 0
      ? fetch(`${obj.clients[0].network.backend_server_URL}/start`, {
          method: "patch",
          body: JSON.stringify({
            clients: obj.clients,
            target_channel_name: obj.target_channel_name,
          }),
        })
          .then((result: Response) => result.json())
          .catch((error: any) => {
            console.log(error);
            throw new Error(`Backend refused call with - ${error}`);
          })
      : null;
  });

// full or closed
export const rejectChanges = (session: ISession): void => {
  throw new Error(`${session.session_name} ist closed or full`);
};

export const switcher: ISessionSwitcher = {
  active: {
    checkMinClientsCount,
    getClientsOnSession,
    sendStart,
    changeSessionState,
  },
  running: {
    getSessionName,
    getClientsOnSession,
    sendUpdate,
    changeSessionState,
  },
  full: {
    rejectChanges,
  },
  closed: {
    rejectChanges,
  },
};

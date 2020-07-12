import {
  ISessionSwitcher,
  ISwitcherSessionProps,
  ISwitcherSessionNameProps,
  ISwitcherClientProps,
} from "../../models/Interfaces/session/ISessionSwitcher";
import ISession from "../../models/Interfaces/session/ISession";
import { _SessionState } from "../../models/enums/_SessionState";
// import fetch, { Response } from "node-fetch";
import { addToDefaultParams } from "../helpers/basic-default-service-params";
import { Application, Paginated } from "@feathersjs/feathers";
import { IClientConnection } from "../../models/Interfaces/clients/IClientConnection";

//******************************************** */
// Methoden fur switcher um Session state zu andern
// edit: es wird nur der eigene Zustand geandert, kein aufruf auf backend, das wird uber client-inputs gespeist
//******************************************** */

export const validateIncreaseSessionState = async (
  should_switch: (switches: ISessionSwitcher, session: ISession, app: Application) => Promise<{session_name: string, shouldChange: boolean}>,  switcher: ISessionSwitcher, app: Application) => async (session: ISession): Promise<{new_state: _SessionState, session_name: string}> =>
  await should_switch(switcher, session, app).then((answer: {session_name: string, shouldChange: boolean}) =>
    answer.shouldChange ? { new_state: session.state + 1, session_name: answer.session_name} : { new_state: session.state, session_name: answer.session_name} 
  );

// active
export const checkMinClientsCount = (
  obj: ISwitcherSessionProps
): ISwitcherSessionNameProps => {
  return {
    name: obj.session
      ? obj.session.clients.length >= obj.session.min_clients
        ? obj.session?.session_name
        : undefined
      : undefined,
    target_channel_name: obj.session?.session_name,
    app: obj.app,
  };
};

// export const getClientsOnSession = async (
//   obj: ISwitcherSessionNameProps
// ): Promise<ISwitcherClientProps> =>
//   await obj.app
//     .service("clients")
//     .find(addToDefaultParams({ query: { session_name: obj.name } }))
//     .then((resp: Paginated<IClientConnection>) => {
//       return {
//         clients: resp.data,
//         app: obj.app,
//         target_channel_name: obj.target_channel_name,
//       };
//     });

// export const sendStart = async (
//   promise: Promise<ISwitcherClientProps>
// ): Promise<any | null> =>
//   promise.then((obj: ISwitcherClientProps) => {
//     return obj.clients && obj.clients.length > 1
//       ? fetch(`${obj.clients[0].backend_url}/start`, {
//           method: "post",
//           body: JSON.stringify({
//             clients: obj.clients,
//             target_channel_name: obj.target_channel_name,
//           }),
//         })
//           .then((result: Response) => result.json())
//           .catch((error: any) => {
//             console.log(error);
//             throw new Error(`Backend refused call with - ${error}`);
//           })
//       : null;
//   });

export const changeSessionState = (
  resp: Promise<ISwitcherSessionNameProps>
): Promise<{session_name: string, shouldChange: boolean}> => resp.then((data: ISwitcherSessionNameProps) => {return{ session_name: data.target_channel_name+'', shouldChange: data.name !== undefined }});

// running
export const getSessionName = (
  obj: ISwitcherSessionProps
): ISwitcherSessionNameProps => {
  return {
    name: obj.session ? obj.session.session_name : undefined,
    app: obj.app,
    target_channel_name: obj.session?.session_name,
  };
};

// export const sendUpdate = (
//   promise: Promise<ISwitcherClientProps>
// ): Promise<Response | null> =>
//   promise.then((obj: ISwitcherClientProps) => {
//     return obj.clients && obj.clients.length > 0
//       ? fetch(`${obj.clients[0].backend_url}/start`, {
//           method: "patch",
//           body: JSON.stringify({
//             clients: obj.clients,
//             target_channel_name: obj.target_channel_name,
//           }),
//         })
//           .then((result: Response) => result.json())
//           .catch((error: any) => {
//             console.log(error);
//             throw new Error(`Backend refused call with - ${error}`);
//           })
//       : null;
//   });

// full or closed
export const rejectChanges = (session: ISession): void => {
  throw new Error(`${session.session_name} ist closed or full`);
};

export const switcher: ISessionSwitcher = {
  active: {
    checkMinClientsCount,
    //getClientsOnSession,
  //  sendStart,
    changeSessionState,
  },
  running: {
    getSessionName,
   // getClientsOnSession,
  //  sendUpdate,
    changeSessionState,
  },
  full: {
    rejectChanges,
  },
  closed: {
    rejectChanges,
  },
};

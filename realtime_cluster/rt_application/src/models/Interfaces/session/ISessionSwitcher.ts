import ISession from "./ISession";
import { Application } from "@feathersjs/feathers";
import { IClientConnection } from "../clients/IClientConnection";
import { _SessionState } from "../../enums/_SessionState";

export interface ISessionSwitcher {
  [idx: string]: { [idx: string]: (arg: any) => any };
  active: {
    checkMinClientsCount: (
      obj: ISwitcherSessionProps
    ) => ISwitcherSessionNameProps;
    // getClientsOnSession: (
    //   obj: ISwitcherSessionNameProps
    // ) => Promise<ISwitcherClientProps>;
    //sendStart: (obj: Promise<ISwitcherClientProps>) => Promise<any | null>;
    changeSessionState: (resp: Promise<ISwitcherSessionNameProps>) => Promise<{session_name: string, shouldChange: boolean}>;
  };
  running: {
    getSessionName: (
      session: ISwitcherSessionProps
    ) => ISwitcherSessionNameProps;
    // getClientsOnSession: (
    //   obj: ISwitcherSessionNameProps
    // ) => Promise<ISwitcherClientProps>;
    //sendUpdate: (client: Promise<ISwitcherClientProps>) => Promise<any | null>;
    changeSessionState: (resp: Promise<ISwitcherSessionNameProps>) => Promise<{session_name: string, shouldChange: boolean}>;
  };
  full: {
    rejectChanges: (session: ISession) => void;
  };
  closed: {
    rejectChanges: (session: ISession) => void;
  };
}

// Just for simpler typings
export interface ISwitcherSessionProps {
  session: ISession | undefined;
  app: Application;
}

export interface ISwitcherSessionNameProps {
  name: string | undefined;
  target_channel_name: string | undefined;
  app: Application;
}

export interface ISwitcherClientProps {
  clients: IClientConnection[] | undefined;
  target_channel_name: string | undefined;
  app: Application;
}

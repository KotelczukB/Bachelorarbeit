import ISession from "./ISession";
import { Application } from "@feathersjs/feathers";
import { IClientConnection } from "../clients/IClientConnection";

export interface ISessionSwitcher {
  [idx: string]: { [idx: string]: (arg: any) => any };
  active: {
    checkMinClientsCount: (
      obj: ISwitcherSessionProps
    ) => ISwitcherSessionNameProps;
    getClientsOnSession: (
      obj: ISwitcherSessionNameProps
    ) => Promise<ISwitcherClientProps>;
    sendStart: (obj: Promise<ISwitcherClientProps>) => Promise<any | null>;
    changeSessionState: (resp: Promise<any | null>) => Promise<boolean>;
  };
  running: {
    getSessionName: (
      session: ISwitcherSessionProps
    ) => ISwitcherSessionNameProps;
    getClientsOnSession: (
      obj: ISwitcherSessionNameProps
    ) => Promise<ISwitcherClientProps>;
    sendUpdate: (client: Promise<ISwitcherClientProps>) => Promise<any | null>;
    changeSessionState: (resp: Promise<any | null>) => Promise<boolean>;
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
  session: ISession | null;
  app: Application;
}

export interface ISwitcherSessionNameProps {
  name: string | null;
  target_channel_name: string | undefined;
  app: Application;
}

export interface ISwitcherClientProps {
  clients: IClientConnection[] | null;
  target_channel_name: string | undefined;
  app: Application;
}

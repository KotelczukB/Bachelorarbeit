import ISession from "./ISession";
import { IClient } from "../IClientForm";
import { SessionState } from "../../enums/SessionState";
import { Application } from "@feathersjs/feathers";

export interface ISessionSwitcher {
  [idx: string]: { [idx: string]: (arg: any) => any};
  active: {
    checkMinClientsCount: (obj: ISwitcherSessionProps) => ISwitcherSessionNameProps;
    getClientsOnSession: (obj: ISwitcherSessionNameProps) => Promise<ISwitcherClientProps>;
    sendStart: (obj: Promise<ISwitcherClientProps>) => Promise<any | null>;
    changeSessionState: (resp: Promise<any | null>) => Promise<boolean>;
  };
  running: {
    getSessionName: (session: ISwitcherSessionProps) => ISwitcherSessionNameProps;
    getClientsOnSession: (obj: ISwitcherSessionNameProps) => Promise<ISwitcherClientProps>;
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
  session: ISession | null,
  app: Application 
}

export interface ISwitcherSessionNameProps {
  name: string | null,
  app: Application 
}

export interface ISwitcherClientProps {
  clients: IClient[] | null,
  app: Application 
}
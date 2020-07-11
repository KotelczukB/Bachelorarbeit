import { ISessionSwitcher } from "../../models/Interfaces/session/ISessionSwitcher";
import ISession from "../../models/Interfaces/session/ISession";
import { _SessionState } from "../../models/enums/_SessionState";
import pipe from "../helpers/pipe";
import R from "ramda";
import { Application } from "@feathersjs/feathers";

export default async (
  switches: ISessionSwitcher,
  session: ISession,
  app: Application
): Promise<{ backend_session: string; shouldChange: boolean }> =>
    await pipe(...R.values(switches[_SessionState[session.state]]))({session, app});

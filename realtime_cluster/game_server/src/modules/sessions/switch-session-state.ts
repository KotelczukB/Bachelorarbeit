import { ISessionSwitcher } from "../../models/Interfaces/session/ISessionSwitcher";
import ISession from "../../models/Interfaces/session/ISession";
import { SessionState } from "../../models/enums/SessionState";
import pipe from "../helpers/pipe";
import R from "ramda";

export default async (
  switches: ISessionSwitcher,
  session: ISession
): Promise<boolean | null> =>
    await pipe(...R.values(switches[SessionState[session.state]]))(session);

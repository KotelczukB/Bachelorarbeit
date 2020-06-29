import { SessionState } from "../../models/enums/SessionState";
import ISession from "../../models/Interfaces/session/ISession";

export const getRunningSessionState = (session: ISession): SessionState =>
  session.activ
    ? !session.started && !session.closed
      ? SessionState.activ
      : session.started && !session.closed
      ? SessionState.running
      : session.started && session.closed
      ? SessionState.full
      : SessionState.dead
    : SessionState.dead;
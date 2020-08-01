import ISession from "../../models/Interfaces/session/ISession";
import { _SessionState } from "../../models/enums/_SessionState";
import { Application } from "@feathersjs/feathers";
import R  from "ramda";
import logger from "../../logger";

//******************************************** */
// Switching session state based on restrictions
//******************************************** */

export const validateIncreaseSessionState = async (app: Application, session: ISession): Promise<string>  => await R.pipe(rejectChanges, isFull, isClosed, getSession, updateSession(app))(session)
  

export const isFull = (
  session: ISession | string
): ISession | string =>  typeof session === 'string' ? session : changeSessionState(session, session.clients.length >= +session.min_clients && session.state !== _SessionState.full)

export const isClosed = (
  session: ISession | string
): ISession | string =>  typeof session === 'string' ? session : changeSessionState(session, session.clients.length === +session.max_clients)

export const changeSessionState = (
  session: ISession, change: boolean
): ISession => typeof session === 'string' ? session :
  { 
    ...session,
    state: change ? session.state + 1 : session.state
  }
;

export const getSession = (
  session: ISession | string
): ISession | string => session

// closed
export const rejectChanges = (session: ISession): string | ISession => {
  if(session.state === _SessionState.closed) {
    logger.info(`${session.session_name} ist closed`);
    return session.session_name;
  }
  return session;
};

export const updateSession = (app: Application) => async (
  session: ISession | string,
) => {  
  if(typeof session === 'string')
    return session
  await app.service("sessions").update((session as ISession)._id, session); 
  return (session as ISession).session_name; 
}



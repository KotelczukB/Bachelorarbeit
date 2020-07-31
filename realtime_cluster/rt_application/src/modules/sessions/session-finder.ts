import R from "ramda";
import ISession from "../../models/Interfaces/session/ISession";
import { default_params, addToDefaultParams } from "../helpers/basic-default-service-params";
import { Paginated } from "@feathersjs/feathers";
// ***************************************
// Searching session that is already created with requested backend data
// ***************************************
export const getFreeSession = async (
  session_service: any,
  client_id: string,
  userType: string,
  targetURL: string
): Promise<{ user: string; session: string; backend: string } | null> =>
  await filterSessions(session_service, targetURL)
    .then((elem: ISession) => getNameAndPatchSession(elem, session_service, client_id, userType)
    )
    .catch((error) => { return null} );

export const getNameAndPatchSession = async (
  session: ISession,
  service: any,
  client_id: string,
  userType: string
): Promise<{ user: string; session: string; backend: string } | null> =>
  await service
    .patch(session._id, { $push: { clients: client_id } }, default_params)
    .then(getJustName(userType)).catch((err: any) => {console.log(err); return null});

export const filterSessions = async (
  service: any,
  targetURL: string
): Promise<ISession> =>
  await service.find(addToDefaultParams({query: {backend: targetURL, state: {$lt: 3}}})).then((res: Paginated<ISession>) => res.data.find((sess: ISession) => sess.clients.length < (+sess.max_clients)));

export const getJustName = (user_type: string) => (
  session: ISession
): { user: string; session: string; backend: string } | null =>
  session !== undefined
    ? {
        user: session[`${user_type}_channel`],
        session: session.session_name,
        backend: session.backends_channel,
      }
    : null;


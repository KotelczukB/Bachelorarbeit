import R from "ramda";
import ISession from "../../models/Interfaces/session/ISession";
import { default_params } from "../helpers/basic-default-service-params";
// ***************************************
// Sucht eine Session die bereits erstellt worden ist mit dem gleichem Backend
// ***************************************
export const getFreeSession = async (
  service: any,
  client_id: string,
  userType: string,
  targetURL: string
): Promise<{ user: string; session: string; backend: string } | null> =>
  filterSessions(service, userType, targetURL)
    .then((elem) =>
      getNameAndPatchSession(R.head(elem.data), service, client_id, userType)
    )
    .catch((error) => { return null} );

export const getNameAndPatchSession = async (
  session: ISession,
  service: any,
  client_id: string,
  userType: string
): Promise<{ user: string; session: string; backend: string } | null> =>
  service
    .patch(session._id, { $push: { clients: client_id } }, default_params)
    .then(() => getJustName(userType)(session));

export const filterSessions = async (
  service: any,
  userType: string,
  targetURL: string
): Promise<ISession> =>
  await service.find(buildQuery(userType, targetURL));

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

export const buildQuery = (
  userType: string,
  targetURL: string
): {} => {
  return {
    [userType]: { $exists: true },
    $where: `this.${userType}.length<this.max_clients`,
    state: { $lt: 2 },
    backends: targetURL,
  };
};

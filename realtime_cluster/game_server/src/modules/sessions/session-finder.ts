import R from "ramda";
import ISession from "../../models/Interfaces/session/ISession";
// ***************************************
// Sucht eine Session die bereits erstellt worden ist mit dem gleichem Backend
// ***************************************
export const getFreeSession = async (
  service: any,
  client_id: string,
  maxCount: number,
  userType: string,
  targetURL: string
): Promise<string | null> =>
  filterSessions(service, maxCount, userType, targetURL)
    .then((elem) =>
      getNameAndPatchSession(R.head(elem.data), service, client_id, userType)
    )
    .catch(() => null);

export const getNameAndPatchSession = async (
  session: ISession,
  service: any,
  client_id: string,
  userType: string
): Promise<string | null> =>
  service.patch(session._id, { $push: { clients: client_id } })
    .then(() => getJustName(userType)(session));

export const filterSessions = async (
  service: any,
  maxCount: number,
  userType: string,
  targetURL: string
): Promise<ISession> =>
  await service.find(buildQuery(userType, maxCount, targetURL));

export const getJustName = (user_type: string) => (
  session: ISession
): string | null =>
  session !== undefined ? session[`${user_type}_channel`] : null;

export const buildQuery = (
  userType: string,
  maxCount: number,
  targetURL: string
): {} => {
  return {
    [userType]: { $exists: true },
    $where: `this.${userType}.length<${maxCount}`,
    started: false,
    activ: true,
    backends: targetURL,
  };
};

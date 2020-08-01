import { getFreeSession } from "../sessions/session-finder";
import { createSession } from "../sessions/session-creater";
import ISessionCreate from "../../models/Interfaces/session/ISessionCreate";
import logger from "../../logger";

export default async (
  service_session: any,
  kind: string,
  service_backends: any,
  sessionData: Promise<ISessionCreate>
): Promise<{ user: string; session: string; backend: string } | null> =>
  sessionData.then(async (res: ISessionCreate) => {
    try {
      return (
        (await getFreeSession(
          service_session,
          res.client_id,
          kind,
          res.backend_url
        )) ?? (await createSession(service_session, service_backends, res))
      );
    } catch (err) {
      logger.error('Exception on providing session to client', err);
      return null;
    }
  });

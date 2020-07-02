import { getFreeSession } from "../sessions/session-finder";
import { createSession } from "../sessions/session-creater";
import ISessionCreate from "../../models/Interfaces/session/ISessionCreate";

export default async (
  service_session: any,
  kinde: string,
  service_backends: any,
  sessionData: Promise<ISessionCreate>
): Promise<{ user: string; session: string; backend: string } | null> =>
  sessionData.then(
    async (res: ISessionCreate) =>
      (await getFreeSession(
        service_session,
        res.client_id,
        kinde,
        res.backendURL
      )) ?? (await createSession(service_session, service_backends, res))
  );

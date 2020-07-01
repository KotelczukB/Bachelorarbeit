import { getFreeSession } from "../sessions/session-finder";
import { createSession } from "../sessions/session-creater";
import ISessionCreate from "../../models/Interfaces/session/ISessionCreate";

export default async (
  service_session: any,
  kinde: string,
  service_backends: any,
  sessionData: ISessionCreate
): Promise<{ user: string; session: string, backend: string} | null> => {
  return (
    (await getFreeSession(
      service_session,
      sessionData.client_id,
      kinde,
      sessionData.backendURL
    )) ??
    (await createSession(
      service_session,
      service_backends,
      sessionData
    ))
  );
};

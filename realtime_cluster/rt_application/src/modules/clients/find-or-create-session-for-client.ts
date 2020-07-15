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
    async (res: ISessionCreate) => {
      try{
      const search = await getFreeSession(service_session, res.client_id,  kinde,  res.backend_url)
      console.log('AHA SESSION', search)
      if(search === null)
         return await createSession(service_session, service_backends, res)
      return search;
      } catch(err) {
        console.log(err);
        return null
      }
  })

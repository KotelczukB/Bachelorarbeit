import ISession from "../../models/Interfaces/session/ISession";
import ISessionCreate from "../../models/Interfaces/session/ISessionCreate";
import { default_params, addToDefaultParams } from "../helpers/basic-default-service-params";

// *************************************
// generiere eine neue Session und weise das Backend zu falls es im Echtzeit server registriert wurde
// *************************************

export const createSession = async (
  session_service: any,
  backend_service: any,
  sessionData: ISessionCreate
): Promise<{ user: string; session: string, backend: string} | null> =>
  checkBackendavalible(
    backend_service,
    sessionData.backend_url
  ).then(async (valid: boolean) =>
    valid ? await createNewSession(session_service, sessionData) : null
  );

export const createNewSession = async (
  service: any,
  sessionData: ISessionCreate
): Promise<{ user: string; session: string, backend: string}> =>
  service.create(sessionData).then(getSessionName());

export const checkBackendavalible = async (
  backend_service: any,
  backend_url: string
): Promise<boolean> =>
  backend_service.find(addToDefaultParams({query: { ownURL: backend_url }})).then((elem: any) => elem !== undefined && elem.length > 0);

export const getSessionName = () => (
  session: ISession
): { user: string; session: string, backend: string} => {
  return {
    user: session.clients_channel,
    backend: session.backends_channel,
    session: session.session_name,
  };
};

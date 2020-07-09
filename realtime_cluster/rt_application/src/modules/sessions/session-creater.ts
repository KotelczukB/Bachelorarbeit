import ISession from "../../models/Interfaces/session/ISession";
import ISessionCreate from "../../models/Interfaces/session/ISessionCreate";
import { default_params, addToDefaultParams } from "../helpers/basic-default-service-params";

// *************************************
// generiere eine neue Session und weise das Backend zu falls es im Echtzeit server registriert wurde
// *************************************

export const createSession = async (
  service: any,
  service_second: any,
  sessionData: ISessionCreate
): Promise<{ user: string; session: string, backend: string} | null> =>
  checkBackendavalible(
    service_second,
    sessionData.backendURL
  ).then(async (valid: boolean) =>
    valid ? await createNewSession(service, sessionData) : null
  );

export const createNewSession = async (
  service: any,
  sessionData: ISessionCreate
): Promise<{ user: string; session: string, backend: string}> =>
  service.create(sessionData, default_params).then(getSessionName());

export const checkBackendavalible = async (
  service: any,
  backendURL: string
): Promise<boolean> =>
  service.find(addToDefaultParams({query: { ownURL: backendURL }})).then((elem: any) => elem !== undefined);

export const getSessionName = () => (
  session: ISession
): { user: string; session: string, backend: string} => {
  return {
    user: session.clients_channel,
    backend: session.backends_channel,
    session: session.session_name,
  };
};

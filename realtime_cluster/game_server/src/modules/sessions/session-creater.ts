import ISession from "../../models/Interfaces/session/ISession";
import ISessionCreate from "../../models/Interfaces/session/ISessionCreate";

// *************************************
// generiere eine neue Session und weise das Backend zu falls es im Echtzeit server registriert wurde
// *************************************

export const createSession = async (
  service: any,
  service_second: any,
  sessionData: ISessionCreate
): Promise<string | null> =>
  checkBackendavalible(
    service_second,
    sessionData.backendURL
  ).then(async (valid: boolean) =>
    valid ? await createNewSession(service, sessionData) : null
  );

export const createNewSession = async (service: any, sessionData: ISessionCreate): Promise<string> =>
  service.create(sessionData).then(getSessionName());

export const checkBackendavalible = async (
  backendURL: string,
  service: any
): Promise<boolean> =>
  service.find({ ownURL: backendURL }).then((elem: any) => elem !== undefined);

export const getSessionName = () => (session: ISession): string =>
  session.session_name;

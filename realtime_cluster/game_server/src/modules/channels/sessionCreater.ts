import ISession from "../../Models/session/ISession";

export const createSession = async (service: any, type: string): Promise<string> => 
  service.create({name: `${type}-Session-${+ new Date()}`}).then(getSessionName());

export const getSessionName = () => (session: ISession): string => session.session_name
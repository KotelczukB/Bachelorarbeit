import { Application, Service } from "@feathersjs/feathers";
import R, { isEmpty } from "ramda";
import ISession from "../../Models/session/ISession";

export const getFreeSession = async (
  service: any,
  type: string,
  prop: string,
  maxCount: number
): Promise<string | null> =>
    filterSessions(service, prop, maxCount)
      .then(elem => getJustName(R.head(elem)))
   ?? createNewChannel(service, type);

export const filterSessions = async (service: any, prop: string, maxCount: number): Promise<ISession[]> =>
  await service.find({prop: {$lt: maxCount}});

export const getJustName = (session: any): string | null => session !== undefined ? session.session_name : null;

export const createNewChannel = async (service: any, type: string): Promise<string> => 
  service.create(`${type}-Session-${new Date()}`).then((elem: ISession) => elem.session_name);

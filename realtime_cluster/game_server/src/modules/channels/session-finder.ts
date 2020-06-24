import { Application, Service } from "@feathersjs/feathers";
import R, { isEmpty } from "ramda";
import ISession from "../../Models/session/ISession";

export const getFreeSession = async (
  service: any,
  maxCount: number
): Promise<string | null> =>
  filterSessions(service, maxCount).then((elem) =>
    getJustName(R.head(elem))
  );

export const filterSessions = async (
  service: any,
  maxCount: number
): Promise<ISession[]> => await service.find({ count: { $lt: maxCount } });

export const getJustName = (session: any): string | null =>
  session !== undefined ? session.session_name : null;

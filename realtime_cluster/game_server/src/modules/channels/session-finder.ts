import { Application, Service } from "@feathersjs/feathers";
import R from "ramda";

export const getFreeSession = async (
  service: any,
  maxCount: number
): Promise<string | null> =>
  filterSessions(service, maxCount).then((elem) =>
    getJustName(R.head(elem.data))
  ).catch(() => null);

export const filterSessions = async (
  service: any,
  maxCount: number
): Promise<any> => await service.find({ count: { $lt: maxCount } });

export const getJustName = (session: any): string | null =>
  session !== undefined ? session.session_name : null;

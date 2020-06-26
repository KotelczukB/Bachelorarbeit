import { Application, Service } from "@feathersjs/feathers";
import R from "ramda";

export const getFreeSession = async (
  service: any,
  maxCount: number,
  queryProp: string
): Promise<string | null> =>
  filterSessions(service, maxCount, queryProp).then((elem) =>
    getJustName(R.head(elem.data))
  ).catch(() => null);

export const filterSessions = async (
  service: any,
  maxCount: number,
  queryProp: string
): Promise<any> => await service.find({ [queryProp]: {$exists:true}, $where:`this.${queryProp}.length<${maxCount}`});

export const getJustName = (session: any): string | null =>
  session !== undefined ? session.session_name : null;

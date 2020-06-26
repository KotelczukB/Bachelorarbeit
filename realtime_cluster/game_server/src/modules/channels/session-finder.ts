import { Application, Service } from "@feathersjs/feathers";
import R from "ramda";

export const getFreeSession = async (
  service: any,
  maxCount: number,
  queryProp: string,
  targetURL?: string
): Promise<string | null> =>
  filterSessions(service, maxCount, queryProp, targetURL)
    .then((elem) => getJustName(R.head(elem.data)))
    .catch(() => null);

export const filterSessions = async (
  service: any,
  maxCount: number,
  queryProp: string,
  targetURL?: string
): Promise<any> =>
  await service.find(buildQuery(queryProp, maxCount, targetURL));

export const getJustName = (session: any): string | null =>
  session !== undefined ? session.session_name : null;

export const buildQuery = (
  queryProp: string,
  maxCount: number,
  targetURL?: string
) => targetURL !== undefined
    ? {
        [queryProp]: { $exists: true },
        $where: `this.${queryProp}.length<${maxCount}`,
        backends: targetURL,
      }
    : {
        [queryProp]: { $exists: true },
        $where: `this.${queryProp}.length<${maxCount}`,
      };

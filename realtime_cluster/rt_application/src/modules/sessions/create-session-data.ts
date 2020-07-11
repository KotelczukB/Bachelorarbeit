import ISessionCreate from "../../models/Interfaces/session/ISessionCreate";
import { addToDefaultParams } from "../helpers/basic-default-service-params";

export default async (
  backendURL: string,
  service: any
): Promise<ISessionCreate> =>
  service
    .find(addToDefaultParams({ query: { ownURL: backendURL } }))
    .then((res: any) => {
      return {
        name: `Session-${+new Date()}`,
        backendURL,
        interval: res.data[0].interval_value,
        client_max: res.data[0].max_session_clients,
        client_min: res.data[0].min_session_clients,
      };
    });

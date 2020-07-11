import ISessionCreate from "../../models/Interfaces/session/ISessionCreate";
import { addToDefaultParams } from "../helpers/basic-default-service-params";
import { IBackend } from "../../models/Interfaces/backends/IBackend";

export default async (
  backend_url: string,
  client_id: string,
  service: any
): Promise<ISessionCreate> =>
  service
    .find(addToDefaultParams({ query: { ownURL: backend_url } }))
    .then((res: IBackend[]) => {
      return {
        name: `Session-${+new Date()}`,
        backend_url: backend_url,
        client_id,
        interval: res[0].interval_value,
        client_max: res[0].max_session_clients,
        client_min: res[0].min_session_clients,
      };
    });

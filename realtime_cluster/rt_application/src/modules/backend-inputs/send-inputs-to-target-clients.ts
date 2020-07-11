import { IBackendInput } from "../../models/Interfaces/backend-inputs/IBackendInput";
import { addToDefaultParams } from "../helpers/basic-default-service-params";
import ISession from "../../models/Interfaces/session/ISession";
import { Channel } from "@feathersjs/transport-commons/lib/channels/channel/base";
import { Application } from "@feathersjs/feathers";
import backendInputAppRtModifications from "../rtFunctions/backend-input-app-rt-modifications";
import { _AppType } from "../../models/Interfaces/_AppType";
import { _SessionState } from "../../models/enums/_SessionState";

export default async (
  input: IBackendInput,
  session_service: any,
  app: Application,
  appType: _AppType
): Promise<(Channel)[]> =>
  session_service
    .find(
      addToDefaultParams({
        query: { session_name: input.session_name, backend: input.ownURL, state: {$lt: _SessionState.closed}},
      })
    )
    .then((res: any) =>
      (res.data as ISession[]).map(setDataToChannel(app, input, appType))
    );

export const setDataToChannel = (app: Application, input: IBackendInput, appType: _AppType) => (
  session: ISession
): Channel | null => 
// prufen ob daten die vom AppExtServer gekommen sind, schon veraltet sind oder nicht.
(session.newest_update - session.syncPing) > input.created_at ? 
  app
    .channel(session.clients_channel)
    .send(backendInputAppRtModifications(input, appType)) : null;

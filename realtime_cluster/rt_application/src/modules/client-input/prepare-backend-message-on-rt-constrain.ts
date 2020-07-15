import { Application } from "@feathersjs/feathers";
import { addToDefaultParams } from "../helpers/basic-default-service-params";
import ISession from "../../models/Interfaces/session/ISession";
import getNewestInputsOnSession from "./get-newest-inputs-on-session";
import clientInputsRtModifications from "../rtFunctions/client-inputs-app-rt-modifications";
import { Channel } from "@feathersjs/transport-commons/lib/channels/channel/base";
import { IMessageToBackend } from "../../models/Interfaces/backend-inputs/IMessageToBackend";
import { IBackendInput } from "../../models/Interfaces/backend-inputs/IBackendInput";

//**************************************************** */
// after Backend Input -> setzt Timeout nachdem alle Client-inputs geholt werden (neusten und in der Session)
// und an das Backend geschickt werden sollen 
//**************************************************** */

export default async (
  data: IBackendInput,
  app: Application,
  minInterval: number
): Promise<Channel[]> =>
  app
    .service("sessions")
    .find(addToDefaultParams({ query: { backend: data.ownURL } }))
    .then((res: any) =>
      res.data.filter((elem: ISession) => elem.interval_value > minInterval)
    )
    .then((sessions: ISession[]) => {
      sessions.forEach((session: ISession) =>
        setTimeout(
          () =>
            getNewestInputsOnSession(
              app.service('sessions'),
              app.service("client-inputs"),
              session.session_name,
              -1
            )
              .then( async (stuff) => await clientInputsRtModifications(`http://${app.get('host')}:${app.get('port')}`)(stuff))
              .then((resp: IMessageToBackend | null) =>
                app.channel(session.backends_channel).send({
                  resp,
                })
              ),
              // interval + ping damit alle im Interval ankommen konnen
          session.interval_value + session.syncPing
        )
      );
    });

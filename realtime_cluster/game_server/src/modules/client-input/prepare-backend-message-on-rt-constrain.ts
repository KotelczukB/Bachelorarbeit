import { Application } from "@feathersjs/feathers";
import { addToDefaultParams } from "../helpers/basic-default-service-params";
import ISession from "../../models/Interfaces/session/ISession";
import getNewestInputsOnSession from "./get-newest-inputs-on-session";
import clientInputsRtModifications from "../rtFunctions/client-inputs-rt-modifications";
import { Channel } from "@feathersjs/transport-commons/lib/channels/channel/base";
import { IBackendMessage } from "../../models/Interfaces/backend-inputs/IBackendMessage";
import { IBackendInput } from "../../models/Interfaces/backend-inputs/IBackendInput";

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
              app.service("client-inputs"),
              session.session_name,
              -1
            )
              .then(clientInputsRtModifications)
              .then((resp: IBackendMessage) =>
                app.channel(session.backends_channel).send({
                  resp,
                })
              ),
          session.interval_value
        )
      );
    });

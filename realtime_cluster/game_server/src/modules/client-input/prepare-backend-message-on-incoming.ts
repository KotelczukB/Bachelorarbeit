import IClientMessage from "../../models/Interfaces/clients-inputs/IClientMessage";
import { Application } from "@feathersjs/feathers";
import { Channel } from "@feathersjs/transport-commons/lib/channels/channel/base";
import { addToDefaultParams } from "../helpers/basic-default-service-params";
import ISession from "../../models/Interfaces/session/ISession";
import getNewestInputsOnSession from "./get-newest-inputs-on-session";
import clientInputsRtModifications from "../rtFunctions/client-inputs-rt-modifications";
import { IBackendMessage } from "../../models/Interfaces/backend-inputs/IBackendMessage";

export default async (
  data: IClientMessage,
  app: Application,
  minInterval: number
): Promise<Channel[]> =>
  app
    .service("sessions")
    .find(addToDefaultParams({ query: { session_name: data.session_name } }))
    .then((res: any) =>
      res.data.filter((elem: ISession) => elem.interval_value < minInterval)
    )
    .then((session: ISession[]) => {
      session.forEach((session: ISession) =>
        getNewestInputsOnSession(
          app.service("client-inputs"),
          session.session_name,
          -1
        )
          .then(clientInputsRtModifications)
          .then((resp: IBackendMessage) =>
            app.channel(session.session_name).send({
              resp,
            })
          )
      );
    });

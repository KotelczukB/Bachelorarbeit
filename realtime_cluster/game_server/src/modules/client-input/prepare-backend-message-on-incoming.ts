import IClientMessage from "../../models/Interfaces/clients-inputs/IClientMessage";
import { Application } from "@feathersjs/feathers";
import { Channel } from "@feathersjs/transport-commons/lib/channels/channel/base";
import { addToDefaultParams } from "../helpers/basic-default-service-params";
import ISession from "../../models/Interfaces/session/ISession";
import getNewestInputsOnSession from "./get-newest-inputs-on-session";
import clientInputsRtModifications from "../rtFunctions/client-inputs-rt-modifications";
import { IBackendMessage } from "../../models/Interfaces/backend-inputs/IBackendMessage";

//********************************************
// Beim Client input create hole die dazugehorige Session
// Prufe ob das gesetzte Intervall kleiner den true RealTime Interval ist
// nicht dann passiert nichts
// wenn doch dann sende Daten ans Backend verzoggert um den letzten und hohsten ping
//********************************************

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
    .then((sessions: ISession[]) => {
      sessions.forEach((session: ISession) => 
      setTimeout(() => 
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
          ), session.syncPing
      ));
    });

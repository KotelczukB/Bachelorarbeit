import IClientMessage from "../../models/Interfaces/clients-inputs/IClientMessage";
import { Application, Paginated } from "@feathersjs/feathers";
import { addToDefaultParams } from "../helpers/basic-default-service-params";
import ISession from "../../models/Interfaces/session/ISession";
import getNewestInputsOnSession from "./get-newest-inputs-on-session";
import clientInputsRtModifications from "../rtFunctions/client-inputs-app-rt-modifications";
import { IMessageToBackend } from "../../models/Interfaces/backend-inputs/IMessageToBackend";
import { getPort, getHOST } from "../helpers/get-envs";

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
): Promise<IMessageToBackend | null> =>
  await app
    .service("sessions")
    .find(addToDefaultParams({ query: { session_name: data.session_name } }))
    .then((res: Paginated<ISession>) =>
      res.data.filter((elem: ISession) => +elem.interval_value <= minInterval)
    )
    .then(async(sessions: ISession[]) => {
      return await Promise.all(sessions.map(async (session: ISession) =>
        await getNewestInputsOnSession(
          app.service('sessions'),
          app.service("client-inputs"),
          session.session_name,
          -1 // sort direction
        )
          .then( async (stuff) =>  await Promise.all(stuff))
          .then( 
            clientInputsRtModifications(`http://${getHOST()}:${getPort()}`, session.backends_channel)
          ).catch(err => {console.log('clientinptus err', err)}))
      )
  }).catch((err: any) => {console.log(err)});

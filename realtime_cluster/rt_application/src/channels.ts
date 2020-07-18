import "@feathersjs/transport-commons";
import { Application } from "./declarations";
import getConnectionObject from "./modules/helpers/get-connection-object";
import { _AppType } from "./models/Interfaces/_AppType";
import { IConnection } from "./models/IConnection";
import { _ExternType } from "./models/Interfaces/_ExternType";
import idetifyBackendServer from "./modules/helpers/idetify-backend-server";
import { IMessageToBackend } from "./models/Interfaces/backend-inputs/IMessageToBackend";
import { IChatMessage } from "./models/Interfaces/chat/IChatMessage";
import sendDataToBackend from "./modules/rtFunctions/send-data-to-backend";
import { IBackendResponse } from "./models/Interfaces/backend-inputs/IBackendResponse";
import validateRtConstrain from "./modules/rtFunctions/validate-rt-constrain";
import getTimeStamp from "./modules/helpers/getTimeStamp";
import { getType } from "./modules/helpers/get-envs";

export default function (app: Application) {
  if (typeof app.channel !== "function") {
    return;
  }

  const interval: number = app.get("min_rt_interval");

  //********************************************** */
  // realtime mit sockets geht nur mit clients
  // prufe ob backend schon gespeichert
  // fuge client zu dem Session channel
  //********************************************** */

  app.on("connection", async (connection: IConnection) => {
    // On a new real-time connection, add it to the anonymous channel
    if (connection.type === "backend") {
      console.log('backend connnected socket', connection)
      return app.channel("waiting").join(connection);
      
    }
    await getConnectionObject(connection, app)
      .then(
        async (obj: { backend_channel: string; client_channel: string }) => {
          // Check ob das backend gespeichert ist
          const backend_instance = await idetifyBackendServer(
            connection,
            app.service("backends")
          );
          if (!backend_instance || backend_instance.length < 1)
            throw new Error("requested Backendserver could not be found");

          const backend_connection = app
            .channel("waiting")
            .connections.filter(
              (elem: any) => elem.backend_url === backend_instance[0].own_url
            );
            console.log('SOCKET', obj.backend_channel, backend_connection[0]);
            return [app.channel(obj.client_channel).join(connection),
            app.channel(obj.backend_channel).join(backend_connection[0])];
       }
      )
      .catch((err) => console.log(`connection setting error ${err}`));
  });

  //******************************************** */
  // standard realtime verhalten
  // get data
  // send data
  // easy
  //******************************************** */
  app.service("chat").publish("created", (data: IChatMessage, context) => {
    console.log("emitting");
    return app.channel(data.channel).send(data);
  });

  //******************************************** */
  // Sende clients Input zu validerung an das backend
  // awaite die Antwort
  // passe die Antwort an
  // prufe Echtzeitbedingung
  // sende an die clients
  // Ziel -> async Kette bleibt beim Realtime Server
  //******************************************** */
  app.service("client-inputs").publish("created", async (data: IMessageToBackend, context) => {
      console.log("client inputs created",  app.channel(data.channel).connections);
      return app.channel(data.channel)
  }
      // await sendDataToBackend(data)
      //   .then((response: IBackendResponse) => {
      //     console.log(
      //       `BACKEND RESPONSED IN `,
      //       getTimeStamp() - data.created_at
      //     );
      //     if (validateRtConstrain(data.created_at, getTimeStamp()))
      //       return app.channel(data.channel).send(response);
      //   })
      //   .catch((err: any) =>
      //     console.log("Error on sending new Input to Backend", err)
      //   )
  );

  app.service("backend-inputs").publish("created", (data: IBackendResponse, context) => {
    console.log('sending from backend')
      return app.channel(data.client_channel);
    });

  // Preventing area
  app.service("health").publish(() => {
    null;
  });
  app.service("backends").publish(() => {
    null;
  });
  app.service("clients").publish(() => {
    null;
  });
  app.service("client-inputs").publish("updated", () => {
    null;
  });
  app.service("client-inputs").publish("patched", () => {
    null;
  });
}

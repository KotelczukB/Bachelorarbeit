import "@feathersjs/transport-commons";
import { Application } from "./declarations";
import prepareBackendMessageOnIncoming from "./modules/client-input/prepare-backend-message-on-incoming";
import getConnectionObject from "./modules/helpers/get-connection-object";
import { _AppType } from "./models/Interfaces/_AppType";
import clientInputsChatConverter from "./modules/rtFunctions/client-inputs-chat-converter";
import IClientMessage from "./models/Interfaces/clients-inputs/IClientMessage";
import { IBackendInput } from "./models/Interfaces/backend-inputs/IBackendInput";
import sendDataToClientsAndTriggerInterval from "./modules/backend-inputs/send-data-to-clients-and-trigger-interval";
import getEnvTYPE from "./modules/helpers/get-env-TYPE";
import { IConnection } from "./models/IConnection";
import { _ExternType } from "./models/Interfaces/_ExternType";
import idetifyBackendServer from "./modules/helpers/idetify-backend-server";

export default function (app: Application) {
  if (typeof app.channel !== "function") {
    // If no real-time functionality has been configured just return
    return;
  }

  const interval: number = app.get("min_rt_interval");
  // aus docker holen
  const appType: _AppType = (<any>_AppType)[getEnvTYPE(app)];

  app.on("connection", async (connection: IConnection) => 
    // On a new real-time connection, add it to the anonymous channel
    await getConnectionObject(connection, app).then((obj: (void | { backend_channel: string; client_channel: string })) => {
      // void === backend connection obj === clinet connection
      if (obj) {
        const backend_connection = idetifyBackendServer(connection, app.channel(app.get("waiting_channel")).connections);
        if(!backend_connection)
          throw new Error('requested Backendserver could not be found');
        return [app.channel(`${obj.client_channel}`).join(connection), app.channel(`${obj.backend_channel}`).join(backend_connection)];
      } else {
        return app.channel(app.get("waiting_channel")).join(connection);
      }
    }).catch(err => console.log(`connection setting error ${err}`))
  );

  // publish alle Client-inputs an das Backend nur dann wenn es kein Intervall gibt
  // chat type -> convert input, push
  // hier subscribet das backend
  // hier pushen die clients
  app.service("client-inputs").publish("created", async (data: IClientMessage, context) =>
      appType === _AppType.chat
      // fix chat
        ? app
            .channel(data.target_channel_name)
            .send(clientInputsChatConverter(data))
        : await prepareBackendMessageOnIncoming(data, app, interval) // returns backend channel somit publish nicht an die clients
    );
  // Setzt ein um das Interval varzoggerten publish von client-inputs an das Backend
  // hier pushed das backend
  // hier subscriben die clients 
  app.service("backend-inputs").publish("created", async (data: IBackendInput, context) =>
        await sendDataToClientsAndTriggerInterval(
          data,
          app,
          app.service("sessions"),
          interval,
          appType
        )
    );// returs client channels somit gehen messages an clietns raus

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
  app.service("client-inputs").publish("updated", () => {null});
  app.service("client-inputs").publish("patched", () => {null});
}

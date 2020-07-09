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

export default function (app: Application) {
  if (typeof app.channel !== "function") {
    // If no real-time functionality has been configured just return
    return;
  }

  const interval: number = app.get("min_rt_interval");
  // aus docker holen
  const appType: _AppType = (<any>_AppType)[getEnvTYPE(app)];

  app.on("connection", (connection: any) => {
    // On a new real-time connection, add it to the anonymous channel
    getConnectionObject(connection, app).then((obj: any) => {
      if (obj.data[0]) {
        return app.channel(`${connection.targetChannel}`).join(connection);
      } else {
        throw new Error("Client not registerd yet.");
      }
    });
  });

  // publish alle Client-inputs an das Backend nur dann wenn es kein Intervall gibt
  // chat type -> convert input, push
  app.service("client-inputs").publish("created", async (data: IClientMessage, context) =>
      appType === _AppType.chat
        ? app
            .channel(data.target_channel_name)
            .send(clientInputsChatConverter(data))
        : await prepareBackendMessageOnIncoming(data, app, interval)
    );
  // Setzt ein um das Interval varzoggerten publish von client-inputs an das Backend
  app.service("backend-inputs").publish("created", async (data: IBackendInput, context) =>
        await sendDataToClientsAndTriggerInterval(
          data,
          app,
          app.service("sessions"),
          interval,
          appType
        )
    );

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

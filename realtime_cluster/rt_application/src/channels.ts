import "@feathersjs/transport-commons";
import { Application } from "./declarations";
import getConnectionObject from "./modules/helpers/get-connection-object";
import { _AppType } from "./models/Interfaces/_AppType";
import { IConnection } from "./models/IConnection";
import { _ExternType } from "./models/Interfaces/_ExternType";
import idetifyBackendServer from "./modules/helpers/idetify-backend-server";
import { IMessageToBackend } from "./models/Interfaces/backend-inputs/IMessageToBackend";
import { IChatMessage } from "./models/Interfaces/chat/IChatMessage";
import { IBackendResponse } from "./models/Interfaces/backend-inputs/IBackendResponse";
import validateRtConstrain from "./modules/rtFunctions/validate-rt-constrain";
import getTimeStamp from "./modules/helpers/getTimeStamp";
import sendDataToBackend from "./modules/rtFunctions/send-data-to-backend";
import { _SessionState } from "./models/enums/_SessionState";
import { addToDefaultParams } from "./modules/helpers/basic-default-service-params";
import logger from "./logger";

export default function (app: Application) {
  if (typeof app.channel !== "function") {
    return;
  }

  const interval: number = app.get("min_rt_interval");

  //********************************************** */
  // Whole Channel setting logic 
  //
  // If new backend, set to waiting channel
  // If client get backend from waiting channel
  // and join both to the new on session created channels
  //********************************************** */

  app.on("connection", async (connection: IConnection) => {
    // On a new backend connection, add it to the waiting channel
    if (connection.type === "backend") {
      logger.info('backend connnected socket', connection)
      return app.channel("waiting").join(connection);
      
    }
    return await getConnectionObject(connection, app)
      .then(
        async (obj: { backend_channel: string; client_channel: string }) => {
          // idetify requested backend server in waiting channel 
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
            logger.info('Socket', obj.backend_channel, backend_connection[0]);
            if(backend_connection[0] !== undefined)
              return [app.channel(obj.client_channel).join(connection), app.channel(obj.backend_channel).join(backend_connection[0])];
            return app.channel(obj.client_channel).join(connection)
       }
      )
      .catch((err) => logger.error(`Connection setting error ${err}`));
  });

  //************************************ */
  // if user disconnect and there are no connections left then close the related session 
  //************************************ */
  app.on('disconnect', async (connection: IConnection) => {
    if(connection.target_channel && connection.user_name) {
      if(app.channel(connection.target_channel).connections.length < 1)
        await app.service('sessions').patch(null, {state: _SessionState.closed}, addToDefaultParams({query: {session_name: connection.session_name}}))
        logger.info('Session Closed', connection.session_name)
    }
    logger.info('Connection disconnected', connection)
  })

  //******************************************** */
  // Default realtime usage
  // Get data
  // Send data
  // Easy
  //******************************************** */
  app.service("chat").publish("created", (data: IChatMessage, context) => {
      return app.channel(data.channel).send(data);
  });

  //******************************************** */
  // Send client-inputs to backend
  // on HTTP 
  // Await answer
  // Validate answer
  // Check on realtime constrains
  // Send to clients 
  //******************************************** */
  app.service("backend-message").publish("created", async (data: IMessageToBackend, context) => {
      app.set('lastsend', getTimeStamp());
      // comment in for HTTP function
      // await sendDataToBackend(data)
      // .then(async (response: IBackendResponse) => {
      //   if (validateRtConstrain(data.created_at, getTimeStamp())) {
      //     await app.service('backend-inputs').create(response);
      //   }
      // })
      // .catch((err: any) =>
      //   logger.error("Error on sending new Input to Backend", err)
      // )
      // comment out for HTTP function
      return app.channel(data.channel)
    }
  );

  //******************************************** */
  // Validate answer
  // Check on realtime constrains
  // Send to clients 
  //******************************************** */
  app.service("backend-inputs").publish("created", (data: IBackendResponse, context) => {
    logger.info('New backend-input delay', getTimeStamp() - data.created_at)
    if (validateRtConstrain(app.get('lastsend'), getTimeStamp()))
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

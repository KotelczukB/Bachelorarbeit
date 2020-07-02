import "@feathersjs/transport-commons";
import { Application } from "./declarations";
import prepareClientInputsOnBackendCall from "./modules/client-input/prepare-backend-message-on-rt-constrain";
import prepareBackendMessageOnIncoming from "./modules/client-input/prepare-backend-message-on-incoming";
import getConnectionObject from "./modules/helpers/get-connection-object";

export default function (app: Application) {
  if (typeof app.channel !== "function") {
    // If no real-time functionality has been configured just return
    return;
  }

  app.on("connection", (connection: any) => {
    // On a new real-time connection, add it to the anonymous channel
    getConnectionObject(connection, app).then((obj: any) => {
      if(obj.data[0]) {
        return app.channel(`${connection.targetChannel}`).join(connection);
      } else {
        throw new Error("Client not registerd yet.");
      }
    });
  });

  app.on("login", (authResult: any, { connection }: any) => {
    // connection can be undefined if there is no
    // real-time connection, e.g. when logging in via REST
    if (connection) {
      // Obtain the logged in user from the connection
      // const user = connection.user;

      // The connection is no longer anonymous, remove it
      app.channel("anonymous").leave(connection);

      // Add it to the authenticated user channel
      app.channel("authenticated").join(connection);

      // Channels can be named anything and joined on any condition

      // E.g. to send real-time events only to admins use
      // if(user.isAdmin) { app.channel('admins').join(connection); }

      // If the user has joined e.g. chat rooms
      // if(Array.isArray(user.rooms)) user.rooms.forEach(room => app.channel(`rooms/${room.id}`).join(channel));

      // Easily organize users by email and userid for things like messaging
      // app.channel(`emails/${user.email}`).join(channel);
      // app.channel(`userIds/$(user.id}`).join(channel);
    }
  });
  app
    .service("client-inputs")
    .publish("updated", (data, context) =>
      app.channel(context.result.targetChannel)
    );
  app
    .service("client-inputs")
    .publish("patched", (data, context) =>
      app.channel(context.result.targetChannel)
    );


  // publish alle Client-inputs an das Backend nur dann wenn es kein Intervall gibt
  app.service("client-inputs").publish("created", async (data, context) => 
    await app
      .get("min_rt_interval")
      .then(
        async (inteval: number) =>
          await prepareBackendMessageOnIncoming(data, app, inteval)
      )
  );
  // Setzt ein um das Interval varzoggerten publish von client-inputs an das Backend
  app.service("backend-inputs").publish("created",  async (data, context) =>
  // hier noch mal der Publish an die Clients
    await app
      .get("min_rt_interval")
      .then(
        async (interval: number) =>
          await prepareClientInputsOnBackendCall(data, app, interval)
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

  // Here you can also add service specific event publishers
  // e.g. the publish the `users` service `created` event to the `admins` channel
  // app.service('users').publish('created', () => app.channel('admins'));

  // With the userid and email organization from above you can easily select involved users
  // app.service('messages').publish(() => {
  //   return [
  //     app.channel(`userIds/${data.createdBy}`),
  //     app.channel(`emails/${data.recipientEmail}`)
  //   ];
  // });
}

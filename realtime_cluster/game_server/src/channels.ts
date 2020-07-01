import '@feathersjs/transport-commons';
import { HookContext } from '@feathersjs/feathers';
import { Application } from './declarations';
import prepareClientInputs from './modules/client-input/prepare-backend-message-on-rt-constrain';
import { addToDefaultParams } from './modules/helpers/basic-default-service-params';
import ISession from './models/Interfaces/session/ISession';

export default function(app: Application) {
  if(typeof app.channel !== 'function') {
    // If no real-time functionality has been configured just return
    return;
  }

  app.on('connection', (connection: any) => {
    // On a new real-time connection, add it to the anonymous channel
    const client = app.service('clients')._get(connection.outerID);
    if(client) {
      app.channel(`${connection.channelName}`).join(connection);
    } else {
      throw new Error('Client not registerd yet.')
    }
  });

  app.on('login', (authResult: any, { connection }: any) => {
    // connection can be undefined if there is no
    // real-time connection, e.g. when logging in via REST
    if(connection) {
      // Obtain the logged in user from the connection
      // const user = connection.user;
      
      // The connection is no longer anonymous, remove it
      app.channel('anonymous').leave(connection);

      // Add it to the authenticated user channel
      app.channel('authenticated').join(connection);

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
  app.service('client-inputs').publish('updated', (data, context) => app.channel(context.result.targetChannel));
  app.service('client-inputs').publish('patched', (data, context) => app.channel(context.result.targetChannel));

  // Clients Kommunikation
  // publish nur dann wenn es kein Intervall gibt
  app.service('client-inputs').publish('created', async (data, context) => {
    const result = await app.service('sessions').find(addToDefaultParams({query: {session_name: data.session_name}}))
    const session: any = result;
    const minInterval = await app.get('min_rt_interval')
    if(session.interval_value < minInterval) {
      return await prepareClientInputs(data, app, minInterval)
    } 
  });
  // Backend Kommunikation
  app.service('backend-inputs').publish('created', async (data, context) => await app.get("min_rt_interval").then(async (interval: number) => await prepareClientInputs(data, app, interval)))


  // Preventing area
  app.service('health').publish(() => {null});
  app.service('backends').publish(() => {null});
  app.service('clients').publish(() => {null});
  

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
};

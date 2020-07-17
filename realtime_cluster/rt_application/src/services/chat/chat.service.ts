// Initializes the `chat` service on path `/chat`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Chat } from './chat.class';
import hooks from './chat.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'chat': Chat & ServiceAddons<any>;
  }
}

export default function (app: Application) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/chat', new Chat(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('chat');

  service.hooks(hooks);
}

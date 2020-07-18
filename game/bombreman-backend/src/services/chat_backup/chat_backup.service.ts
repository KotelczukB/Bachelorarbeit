// Initializes the `chat_backup` service on path `/chat-backup`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { ChatBackup } from './chat_backup.class';
import hooks from './chat_backup.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'chat-backup': ChatBackup & ServiceAddons<any>;
  }
}

export default function (app: Application) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/chat-backup', new ChatBackup(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('chat-backup');

  service.hooks(hooks);
}

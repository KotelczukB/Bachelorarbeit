// Initializes the `backend-message` service on path `/backend-message`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { BackendMessage } from './backend-message.class';
import hooks from './backend-message.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'backend-message': BackendMessage & ServiceAddons<any>;
  }
}

export default function (app: Application) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/backend-message', new BackendMessage(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('backend-message');

  service.hooks(hooks);
}

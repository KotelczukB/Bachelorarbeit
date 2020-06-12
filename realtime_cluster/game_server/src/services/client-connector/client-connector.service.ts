// Initializes the `clientConnector` service on path `/client-connector`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { ClientConnector } from './client-connector.class';
import hooks from './client-connector.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'client-connector': ClientConnector & ServiceAddons<any>;
  }
}

export default function (app: Application) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/client-connector', new ClientConnector(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('client-connector');

  service.hooks(hooks);
}

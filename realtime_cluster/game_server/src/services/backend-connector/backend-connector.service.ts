// Initializes the `backendConnector` service on path `/backend-connector`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { BackendConnector } from './backend-connector.class';
import hooks from './backend-connector.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'backend-connector': BackendConnector & ServiceAddons<any>;
  }
}

export default function (app: Application) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/backend-connector', new BackendConnector(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('backend-connector');

  service.hooks(hooks);
}

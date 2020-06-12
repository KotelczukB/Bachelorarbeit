// Initializes the `routerConnector` service on path `/router-connector`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { RouterConnector } from './router-connector.class';
import hooks from './router-connector.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'router-connector': RouterConnector & ServiceAddons<any>;
  }
}

export default function (app: Application) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/router-connector', new RouterConnector(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('router-connector');

  service.hooks(hooks);
}

// Initializes the `Clients` service on path `/clients`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Clients } from './clients.class';
import hooks from './clients.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'clients': Clients & ServiceAddons<any>;
  }
}

export default function (app: Application) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/clients', new Clients(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('clients');

  service.hooks(hooks);
}

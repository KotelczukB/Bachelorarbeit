// Initializes the `clientInputs` service on path `/client-inputs`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { ClientInputs } from './client-inputs.class';
import hooks from './client-inputs.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'client-inputs': ClientInputs & ServiceAddons<any>;
  }
}

export default function (app: Application) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/client-inputs', new ClientInputs(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('client-inputs');

  service.hooks(hooks);
}

// Initializes the `backendInputs` service on path `/backend-inputs`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { BackendInputs } from './backend-inputs.class';
import hooks from './backend-inputs.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'backend-inputs': BackendInputs & ServiceAddons<any>;
  }
}

export default function (app: Application) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/backend-inputs', new BackendInputs(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('backend-inputs');

  service.hooks(hooks);
}

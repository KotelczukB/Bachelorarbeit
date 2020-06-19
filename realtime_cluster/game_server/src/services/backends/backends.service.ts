// Initializes the `backends` service on path `/backends`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Backends } from './backends.class';
import hooks from './backends.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'backends': Backends & ServiceAddons<any>;
  }
}

export default function (app: Application) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/backends', new Backends(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('backends');

  service.hooks(hooks);
}

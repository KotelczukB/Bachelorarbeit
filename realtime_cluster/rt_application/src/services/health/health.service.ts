// Initializes the `health` service on path `/health`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Health } from './health.class';
import hooks from './health.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'health': Health & ServiceAddons<any>;
  }
}

export default function (app: Application) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/health', new Health(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('health');

  service.hooks(hooks);
}

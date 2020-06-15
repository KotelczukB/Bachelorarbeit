// Initializes the `applications` service on path `/applications`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Applications } from './applications.class';
import hooks from './applications.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'applications': Applications & ServiceAddons<any>;
  }
}

export default function (app: Application) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/applications', new Applications(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('applications');

  service.hooks(hooks);
}

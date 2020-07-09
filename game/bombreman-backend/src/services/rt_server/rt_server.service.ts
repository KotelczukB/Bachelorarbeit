// Initializes the `rt_server` service on path `/rt-server`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { RtServer } from './rt_server.class';
import hooks from './rt_server.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'rt-server': RtServer & ServiceAddons<any>;
  }
}

export default function (app: Application) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/rt-server', new RtServer(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('rt-server');

  service.hooks(hooks);
}

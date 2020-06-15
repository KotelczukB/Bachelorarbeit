// Initializes the `gameApps` service on path `/game-apps`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { GameApps } from './game-apps.class';
import hooks from './game-apps.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'game-apps': GameApps & ServiceAddons<any>;
  }
}

export default function (app: Application) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/game-apps', new GameApps(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('game-apps');

  service.hooks(hooks);
}

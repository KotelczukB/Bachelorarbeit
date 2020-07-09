// Initializes the `game-session` service on path `/game-session`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { GameSession } from './game-session.class';
import hooks from './game-session.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'game-session': GameSession & ServiceAddons<any>;
  }
}

export default function (app: Application) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/game-session', new GameSession(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('game-session');

  service.hooks(hooks);
}

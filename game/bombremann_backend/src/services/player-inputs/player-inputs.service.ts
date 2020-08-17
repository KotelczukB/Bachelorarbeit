// Initializes the `player-inputs` service on path `/player-inputs`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { PlayerInputs } from './player-inputs.class';
import hooks from './player-inputs.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'player-inputs': PlayerInputs & ServiceAddons<any>;
  }
}

export default function (app: Application) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/player-inputs', new PlayerInputs(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('player-inputs');

  service.hooks(hooks);
}

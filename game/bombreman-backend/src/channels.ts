import '@feathersjs/transport-commons';
import { Application } from './declarations';

export default function(app: Application) {
  if(typeof app.channel !== 'function') {
    // If no real-time functionality has been configured just return
    return;
  }

};

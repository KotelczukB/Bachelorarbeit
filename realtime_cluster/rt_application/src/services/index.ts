import { Application } from '../declarations';
import clients from './clients/clients.service';
import backends from './backends/backends.service';
import health from './health/health.service';
import clientInputs from './client-inputs/client-inputs.service';
import backendInputs from './backend-inputs/backend-inputs.service';
import sessions from './sessions/sessions.service';
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application) {
  app.configure(clients);
  app.configure(backends);
  app.configure(health);
  app.configure(clientInputs);
  app.configure(backendInputs);
  app.configure(sessions);
}

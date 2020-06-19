import { Application } from '../declarations';
import routerConnector from './router-connector/router-connector.service';
import clients from './clients/clients.service';
import backends from './backends/backends.service';
import health from './health/health.service';
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application) {
  app.configure(routerConnector);
  app.configure(clients);
  app.configure(backends);
  app.configure(health);
}

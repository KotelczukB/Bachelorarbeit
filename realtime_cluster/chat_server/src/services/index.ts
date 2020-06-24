import { Application } from '../declarations';
import clients from './clients/clients.service';
import backends from './backends/backends.service';
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application) {
  app.configure(clients);
  app.configure(backends);
}

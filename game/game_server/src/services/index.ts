import { Application } from '../declarations';
import clients from './clients/clients.service';
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application) {
  app.configure(clients);
}

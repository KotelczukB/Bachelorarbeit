import { Application } from '../declarations';
import routerConnector from './router-connector/router-connector.service';
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application) {
  app.configure(routerConnector);
}

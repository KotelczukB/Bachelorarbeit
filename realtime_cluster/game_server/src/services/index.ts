import { Application } from '../declarations';
import users from './users/users.service';
import clientConnector from './client-connector/client-connector.service';
import backendConnector from './backend-connector/backend-connector.service';
import routerConnector from './router-connector/router-connector.service';
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application) {
  app.configure(users);
  app.configure(clientConnector);
  app.configure(backendConnector);
  app.configure(routerConnector);
}

import { Application } from '../declarations';
import applications from './applications/applications.service';
import users from './users/users.service';
import extApps from './ext-apps/ext-apps.service';
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application) {
  app.configure(applications);
  app.configure(users);
  app.configure(extApps);
}

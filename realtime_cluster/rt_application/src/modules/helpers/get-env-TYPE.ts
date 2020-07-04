import e from "cors";
import { Application } from "@feathersjs/feathers";

export default (app: Application): string => {
  if (process.env.TYPE) {
    return process.env.TYPE;
  } else {
    return app.get(
      "app_type"
    ); /*throw new Error('critical ENV Variable not provided')*/
  }
};

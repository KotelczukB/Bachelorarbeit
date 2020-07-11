// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext, Application } from "@feathersjs/feathers";
import { IRealTimeApp } from "../models/real-time/IReatTimeApp";
import { _RealTimeAppType } from "../models/real-time/_RealTimeAppType";
import { _RealTimeAppStatus } from "../models/real-time/_RealTimeAppStatus";
import R from "ramda";
import getRealTimeSetup from "../modules/get-real-time-setup";
import updateStateOnBackend from "../modules/update-state-on-backend";
import { IClientLoginAnswer } from "../models/IClientLoginAnswer";
//************************************ */
// prufe ob da Backend rtServer mitgegeben hat
// prufe ob diese noch aktiv sind
// Holle das ganze setup das fur einen Clinet benotigt wird und ubergebe es an result
//************************************ */

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    const { result, app } = context as {
      result: IClientLoginAnswer;
      app: Application;
    };
    if (result.rt_servers && result.rt_servers.length > 0) {
      const apps_res: IRealTimeApp[][] = [];
          await app.service("applications").find({
              query: {
                connection_string: "host",
              },
            }).then((res: any) => apps_res.push(res))
        console.log(apps_res)
      const apps: IRealTimeApp[] = R.flatten(apps_res);
      // wenn die vom Backend gesendeten Server nicht mehr aktuell sind
      if (apps.filter((elem) => elem !== undefined).length < 1) {
        const setup = await getRealTimeSetup(app.service("applications"));
        if (setup) {
          result.rt_servers = setup;
          await updateStateOnBackend(result.backend_url, setup);
        }
      }
      // Wenn das Backend nicht mitgesendet hat
    } else {
      const setup = await getRealTimeSetup(app.service("applications"));
      if (setup) {
        result.rt_servers = setup;
        await updateStateOnBackend(result.backend_url, setup);
      }
    }
    return context;
  };
};

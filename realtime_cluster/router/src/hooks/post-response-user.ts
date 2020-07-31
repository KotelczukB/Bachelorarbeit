
import { Hook, HookContext, Application } from "@feathersjs/feathers";
import { IRealTimeApp } from "../models/real-time/IReatTimeApp";
import { _RealTimeAppType } from "../models/real-time/_RealTimeAppType";
import { _RealTimeAppStatus } from "../models/real-time/_RealTimeAppStatus";
import R from "ramda";
import getRealTimeSetup from "../modules/get-real-time-setup";
import updateStateOnBackend from "../modules/update-state-on-backend";
import { IClientLoginAnswer } from "../models/IClientLoginAnswer";

//************************************ */
// check if backend response contains rt setup
// check on the state of those
// if backend sent wrong data give new setup to user response
//************************************ */

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    const { result, app } = context as {
      result: IClientLoginAnswer;
      app: Application;
    };
    if (result.rt_servers && result.rt_servers.length > 0) {
      const apps_res: any = await app.service("applications").find({
              query: {
                connection_string: { $in: result.rt_servers.map(elem => elem.serverURL) },
                state: _RealTimeAppStatus[_RealTimeAppStatus.active],
                type: {$in: result.rt_servers.map(elem => elem.type) }
              },
            })
      // backend data not actual
      if (apps_res.data.filter((elem : IRealTimeApp) => elem !== undefined).length < 1) {
        const setup = await getRealTimeSetup(app.service("applications"));
        if (setup) {
          result.rt_servers = setup;
          await updateStateOnBackend(result.backend_url, setup);
        }
      }
      // backend send no data
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

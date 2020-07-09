// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext, Application } from "@feathersjs/feathers";
import { IRealTimeApp } from "../models/real-time/IReatTimeApp";
import { _RealTimeAppType } from "../models/real-time/_RealTimeAppType";
import { _RealTimeAppStatus } from "../models/real-time/_RealTimeAppStatus";
import { IClientLogin } from "../models/IClientLogin";
import R from "ramda";
import getRealTimeSetup from "../modules/get-real-time-setup";
//************************************ */
// prufe ob da Backend rtServer mitgegeben hat
// prufe ob diese noch aktiv sind
// Holle das ganze setup das fur einen Clinet benotigt wird und ubergebe es an result
//************************************ */

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    const { result, app } = context as {
      result: IClientLogin;
      app: Application;
    };
    if (result.rt_server_names && result.rt_server_names.length > 0) {
      const apps_res: IRealTimeApp[][] = await Promise.all(
        result.rt_server_names.map(
          async (elem) =>
            await app
              .service("applications")
              .find({
                query: {
                  connection_string: elem.serverURL,
                  status: _RealTimeAppStatus.active,
                  type: elem.type,
                },
              }).data
        )
      );
      const apps: IRealTimeApp[] = R.flatten(apps_res);
      if (apps.length < 1) {
        result.rt_server_names = await getRealTimeSetup(
          app.service("applications")
        );
      }
    } else {
      result.rt_server_names = await getRealTimeSetup(
        app.service("applications")
      );
    }
    return context;
  };
};

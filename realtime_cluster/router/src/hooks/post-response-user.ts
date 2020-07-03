// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext, Application } from "@feathersjs/feathers";
import { IRealTimeApp } from "../models/real-time/IReatTimeApp";
import { _RealTimeAppType } from "../models/real-time/_RealTimeAppType";
import { _RealTimeAppStatus } from "../models/real-time/_RealTimeAppStatus";
import { getRealTimeSetup, getSomeRTApps } from "../modules/get-real-time-setup";

//************************************ */
// Holle das ganze setup das fur einen Clinet benotigt wird und ubergebe es an result
//************************************ */

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    const { app } = context as { app: Application };
    const rtApp: {
      data: IRealTimeApp[];
      [idx: string]: any;
    }[] = await Promise.all(getRealTimeSetup(app.service("applications")));
    context.result.setup = getSomeRTApps(rtApp);
    return context;
  };
};

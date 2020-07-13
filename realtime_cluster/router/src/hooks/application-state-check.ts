// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from "@feathersjs/feathers";
import { IRealTimeApp } from "../models/real-time/IReatTimeApp";
import fetch from "node-fetch";
import { _RealTimeAppStatus } from "../models/real-time/_RealTimeAppStatus";

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    const { app } = context;
    // get old apps and check the state
    // find apps die nicht antworden und endere den zustand
    await updateApplicationsOnHealthCheck(
      app.service("applications"),
      new Date(-1)
    );
    return context;
  };
};

export const updateApplicationsOnHealthCheck = async (
  app_service: any,
  time_condition: Date
): Promise<void> =>
  await app_service
    .find({ query: { checked_on: { $lt: time_condition } } })
    .then((resp: any) => {
      if (resp.data)
        (resp.data as IRealTimeApp[]).forEach(async (item: IRealTimeApp) =>
          fetch(`${item.connection_string}/health`, {
            method: "get",
          })
            .then((resp: any) => {
              console.log(resp);
              if (!resp.succeed)
                app_service.patch(item._id, {
                  state: _RealTimeAppStatus.inactive,
                });
            })
            .catch((err: any) => console.log(err))
        );
    });

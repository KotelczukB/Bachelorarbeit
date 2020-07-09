import { IRealTimeApp } from "../models/real-time/IReatTimeApp";
import { _RealTimeAppType } from "../models/real-time/_RealTimeAppType";
import { _RealTimeAppStatus } from "../models/real-time/_RealTimeAppStatus";
import R from "ramda";

export default (
  application_service: any
): Promise<{ serverURL: string; status: _RealTimeAppStatus, type: _RealTimeAppType }[]> =>
  Promise.all(getSetup(application_service)).then((rtApp) =>
    getSomeRTApps(rtApp).map((elem) => {
      return { serverURL: elem.connection_string, status: elem.status, type: elem.type };
    })
  );

export const getSetup = (
  application_service: any
): Promise<{ data: IRealTimeApp[]; [idx: string]: any }[]>[] =>
  Object.keys(_RealTimeAppType).map(
    async (key: any) =>
      await application_service.find({
        query: { type: key, active: _RealTimeAppStatus.active },
      })
  );

export const getSomeRTApps = (
  setup: {
    data: IRealTimeApp[];
    [idx: string]: any;
  }[][]
): IRealTimeApp[] =>
  R.flatten(
    setup.map((obj: { data: IRealTimeApp[]; [idx: string]: any }[]) =>
      obj.map(getFirst)
    )
  );

export const getFirst = (setup: {
  data: IRealTimeApp[];
  [idx: string]: any;
}): IRealTimeApp => setup.data[0];

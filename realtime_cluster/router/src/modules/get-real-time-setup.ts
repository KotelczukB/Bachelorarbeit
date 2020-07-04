import { IRealTimeApp } from "../models/real-time/IReatTimeApp";
import { _RealTimeAppType } from "../models/real-time/_RealTimeAppType";
import { _RealTimeAppStatus } from "../models/real-time/_RealTimeAppStatus";

export const getRealTimeSetup = (
  application_service: any
): Promise<{ data: IRealTimeApp[]; [idx: string]: any }>[] =>
  Object.keys(_RealTimeAppType).map(
    async (key: any) =>
      await application_service.find({
        query: { type: key, active: _RealTimeAppStatus.active },
      })
  );

export const getSomeRTApps = (setup: {
  data: IRealTimeApp[];
  [idx: string]: any;
}[]): IRealTimeApp[] => setup.map((obj: {
  data: IRealTimeApp[];
  [idx: string]: any;
}) => getFirst(obj.data)) 

export const getFirst = (setup: IRealTimeApp[]): IRealTimeApp => setup[0];
import { IRealTimeApp } from "../models/real-time/IReatTimeApp";
import { _RealTimeAppType } from "../models/real-time/_RealTimeAppType";
import { _RealTimeAppStatus } from "../models/real-time/_RealTimeAppStatus";
import { IRTServer } from "../models/real-time/IRTServer";

export default async (
  application_service: any
): Promise<IRTServer[] | undefined> => await getSetup(application_service);

export const getSetup = async (
  application_service: any
): Promise<IRTServer[] | undefined> => await application_service.find();

// used in service hook
export const getRTAppOnType = (
  result: IRealTimeApp[],
  type: _RealTimeAppType
): IRealTimeApp | undefined => result.find((elem) => (elem.type === type));

export const getTypedArray = (result: {
  data: IRealTimeApp[];
  [idx: string]: any;
}): (IRealTimeApp | undefined)[] =>
  Object.values(_RealTimeAppType).map((value) =>
    getRTAppOnType(result.data, value)
  );

export const mapObject = (
  application: IRealTimeApp | undefined
): IRTServer | undefined => {
  if (application)
    return {
      serverURL: application.connection_string,
      state: application.state,
      type: application.type,
    };
};

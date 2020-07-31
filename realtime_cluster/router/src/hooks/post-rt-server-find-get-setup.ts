
import { Hook, HookContext, Paginated, Application } from '@feathersjs/feathers';
import { IRealTimeApp } from '../models/real-time/IReatTimeApp';
import { getTypedArray, mapObject } from '../modules/get-real-time-setup';
import { _RealTimeAppStatus } from '../models/real-time/_RealTimeAppStatus';
import { _RealTimeAppType } from '../models/real-time/_RealTimeAppType';

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    const {result} = context as {result: any}
    const setup = getTypedArray(result)
      .map(mapObject)
    if(setup.every(elem => elem !== undefined)) {
      result.data = (setup as { serverURL: string; state: _RealTimeAppStatus; type: _RealTimeAppType }[]);
    } else {
      result.data = undefined
    }
    return context;
  };
}

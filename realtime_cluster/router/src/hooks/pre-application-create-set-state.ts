// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext, Application } from '@feathersjs/feathers';
import { _RealTimeAppStatus } from '../models/real-time/_RealTimeAppStatus';
import { IRealTimeApp } from '../models/real-time/IReatTimeApp';

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    const {data, app} = context as {data: IRealTimeApp, app: Application}
    
    context.data.state = _RealTimeAppStatus.active
    context.data.checked_on = new Date()
    return context;
  };
}

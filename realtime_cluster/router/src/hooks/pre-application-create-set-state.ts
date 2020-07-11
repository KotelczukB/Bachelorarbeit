// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';
import { _RealTimeAppStatus } from '../models/real-time/_RealTimeAppStatus';

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    context.data.state = _RealTimeAppStatus.active
    context.data.checked_on = new Date()
    return context;
  };
}

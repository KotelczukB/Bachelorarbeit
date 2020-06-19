// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    // if auth goes correct
    const {data, app} = context;
    const rtApp = app.service('applications')._find({
      query: {
        active: true,
        backend: data.backend,
      }
    });
    context.result.realtimeApp = rtApp;
    return context;
  };
}

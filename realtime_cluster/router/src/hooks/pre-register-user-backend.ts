// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    const {data, app} = context;
    // check if Backend ist registered
    const backend = await app.service('game-apps').find({
      query: {serverURL: data.serverURL}
    });
    if(!backend) {
      throw new Error('Cannot establish any connection to the requested backend server, please try again later.')
      // log new backend had to be saved
    } else {
      context.data.backend = backend;
    }
    return context;
  };
}

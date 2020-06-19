// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';

// Authentification with an timestamed key from router

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    const {data, app} = context;
    // Validate token
    if(!data.rtAuthToken || data.rtAuthToken !== 'yes')
      throw new Error('premission denied')
    return context;
  };
}

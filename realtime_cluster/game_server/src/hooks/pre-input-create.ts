// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';
import { validateUser } from '../modules/users/auth';

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    const {data, app} = context;
    const auth: boolean = validateUser(app.service('clients'), data.ID);
    // Check token in DB 
    // Validate Message
    return context;
  };
}

// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    // check rt condition
    // if action requiert
    // get latest inputs and convert for backend app.service('backend-input).update()
    // else
    // check if all inputs get updated
    // if yes
    // get all inputs and convert for backend execute app.service('backend-input).update()
    // else
    // return
    return context;
  };
}

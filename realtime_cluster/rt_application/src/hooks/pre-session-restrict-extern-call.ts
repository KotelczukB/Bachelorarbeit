
import { Hook, HookContext } from '@feathersjs/feathers';
import validateActionProvider from '../modules/sessions/validate-action-provider';

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    const {params} = context
    if(!validateActionProvider(params.provider))
      throw new Error('Action not allowed');
    return context;
  };
}

import { Hook, HookContext } from '@feathersjs/feathers';

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    const {params} = context;
    if(params.provider !== null && params.provider !== undefined && params.provider !== 'server')
      throw new Error('Method forbidden')
    return context;
  };
}

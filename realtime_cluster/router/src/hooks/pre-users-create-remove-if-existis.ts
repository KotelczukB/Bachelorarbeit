// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    const {data, app} = context;
    const to_remove = await app
    .service("users")
    .find(null, { query: { user_name: data.user_name } });
    console.log(to_remove)
  await Promise.all(to_remove.data.map(async (elem: any) => {
    app
    .service("users")
    .remove(elem._id);
  }))
    return context;
  };
}

// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';
import { IConnectionData } from '../Models/Interfaces/IClientForm';

// ************************************************
// Entferne den Client aus der DB, Redundanzen vermeidung
// ************************************************

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    const {data, app} = context;
    const connection: IConnectionData = data;
    const exsists = await app.service('clients').find({id: connection.id})
    if(exsists)
      await app.service('client').remove( { id: connection.id } );
    return context;
  };
}

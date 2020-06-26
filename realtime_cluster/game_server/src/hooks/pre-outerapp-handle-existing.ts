// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';
import { IClient } from '../Models/Interfaces/IClientForm';

// ************************************************
// Entferne den Client aus der DB, Redundanzen vermeidung
// ************************************************

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    const {data, app, path} = context;
    const clientData: IClient = data;
    const exsists = await app.service(path).find({id: clientData.id})
    if(exsists)
      await app.service(path).remove( { id: clientData.id } );
    return context;
  };
}

// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';
import { IClient } from '../Models/Interfaces/IClientForm';

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    const {data, app} = context;
    const client: IClient = data;
    const minCountPassed = checkClinetCountPassed(app.service('sessions')) 
    return context;
  };
}


export const checkClinetCountPassed = (service: any) => null;
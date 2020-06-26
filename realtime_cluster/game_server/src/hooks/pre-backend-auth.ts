// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';
import { IBackend } from '../models/Interfaces/IBackendForm';

// ******************************
// Validiere Backend Token
// ****************************** 

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    const {data} = context;
    const backendData: IBackend = data;

    if(!backendData.token || backendData.token !== 'yes-backend')
      throw new Error('access denide')
    return context;
  };
}

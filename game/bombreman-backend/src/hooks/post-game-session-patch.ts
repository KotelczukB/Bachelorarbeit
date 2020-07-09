// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext, Application } from '@feathersjs/feathers';
import getGameState from '../modules/get-game-state';
import { IGameSnapShot } from '../models/IGameSnapShot';

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    const {data, app} = context as {data: any, app: Application}
    const gamestate: IGameSnapShot = getGameState();
   // await app.service('backend-inputs').create(gamestate);
    return context;
  };
}


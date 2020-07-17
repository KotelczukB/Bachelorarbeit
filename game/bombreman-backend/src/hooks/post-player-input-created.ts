// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext, Application } from '@feathersjs/feathers';
import { IPlayerInput } from '../models/IPlayerInput';
import getGameState from '../modules/get-game-state';

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    const {result, app} = context as {result: IPlayerInput, app: Application};
    context.result = await getGameState(result.game_id, app).catch((err: any) => console.log("Create gamestate in post playerinput create failed on", err));
    return context;
  };
}

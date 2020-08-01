import { Hook, HookContext, Application } from '@feathersjs/feathers';
import { IPlayerInput } from '../models/IPlayerInput';
import getGameState from '../modules/get-game-state';
import logger from '../logger';

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    const {result, app} = context as {result: IPlayerInput, app: Application};
    context.result = await getGameState(result.game_id, app).catch((err: any) => logger.error("Create gamestate in post playerinput create failed on", err));
    return context;
  };
}

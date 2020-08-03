import { IGameSnapShot } from "../models/IGameSnapShot";
import { Application } from "@feathersjs/feathers";
import { IGameSesion } from "../models/IGameSession";
import { IBulletObject } from "../models/GameObjects/IBulletObject";
import { IPlayerObject } from "../models/GameObjects/IPlayerObject";
import { _BasicState } from "../models/_SessionState";
import R from "ramda";

//***************************************** */
// where the magic happens
// - get game session
// - get last 2 inputs from each player 
// - check on state changes
// - trow everything into GameSpnapShot
// - return snapshot
//***************************************** */

export default async (game_session_id: any, app: Application): Promise<IGameSnapShot> => {
  const game: IGameSesion = await app.service('game-session').get(game_session_id);
  const player_objects = getPlayerObjects(game)
  const bullet_objects = (getBulletObjects(game))
  const selected = game.player_inputs.map(elem => elem?.app.client_selected)
  const game_can_start = game.players_selected.filter(elem => elem !== null).length === game.player_tokens.length &&  game.players_selected.filter(elem => elem !== null).length >= game.min_player;
  return {
    game_can_start,
    player_won: game.player_won,
    players_selected: selected,
    players_objects: player_objects,
    bullet_objects: bullet_objects,
    session_name: game.game_session,
    type: 'backend',
    game_started: player_objects !== undefined && player_objects.length > 0,
    created_at: +new Date(),
    newest_at: game.newest_at
  };
};

export const getPlayerObjects = (game: IGameSesion): (IPlayerObject | undefined)[] => {
  if(game.player_inputs.length > 0)
    return game.player_inputs.map(elem => elem?.app.player_data)
  return [];
}

export const getBulletObjects = (game: IGameSesion): (IBulletObject | undefined)[] => {
  if(game.player_inputs.length > 0)
  return game.player_inputs.map(elem => elem?.app.bullets_data)
return [];
}

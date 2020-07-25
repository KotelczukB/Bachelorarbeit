import { IGameSnapShot } from "../models/IGameSnapShot";
import { Application } from "@feathersjs/feathers";
import { IGameSesion } from "../models/IGameSession";
import { IBulletObject } from "../models/GameObjects/IBulletObject";
import { IPlayerObject } from "../models/GameObjects/IPlayerObject";
import { _BasicState } from "../models/_SessionState";
import R from "ramda";

//***************************************** */
// where hole magic happens
// hole game session
// hole jeweils die letzten 2 player inputs von jedem player
// vergleiche ob die Unterschiede in akzeptablem rahmen sind (chat test)
// schmeiss alles in ein GameSnapShot
// gebe es zuruck
//***************************************** */

export default async (game_session_id: any, app: Application): Promise<IGameSnapShot> => {
  const game: IGameSesion = await app.service('game-session').get(game_session_id);
  const player_objects = getPlayerObjects(game)
  const bullet_objects = (getBulletObjects(game))
  console.log(bullet_objects)
  const ended = getEnded(game)
  const selected = game.player_inputs.map(elem => elem?.app.client_selected)
  const game_can_start = game.players_selected.filter(elem => elem !== null).length === game.player_tokens.length &&  game.players_selected.filter(elem => elem !== null).length >= game.min_player;
  return {
    game_can_start,
    players_selected: selected,
    players_objects: player_objects,
    bullet_objects: bullet_objects,
    game_ended: ended,
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

export const getEnded = (game: IGameSesion): boolean => {
  return game.state === _BasicState.inactive ? true : game.player_inputs.length > 1 ? game.player_inputs.map(elem => elem ? elem.app.player_data !== undefined ? elem.app.player_data.hp <= 0 : false : false).every(elem => elem === true) : false
}

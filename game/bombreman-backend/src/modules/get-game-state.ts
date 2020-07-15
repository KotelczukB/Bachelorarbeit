import { IGameSnapShot } from "../models/IGameSnapShot";
import { Application } from "@feathersjs/feathers";
import { IGameSesion } from "../models/IGameSession";

//***************************************** */
// where hole magic happens
// hole game session
// hole jeweils die letzten 2 player inputs von jedem player
// vergleiche ob die Unterschiede in akzeptablem rahmen sind (chat test)
// schmeiss alles in ein GameSnapShot
// gebe es zuruck
//***************************************** */

export default (game_session_id: any, app: Application): IGameSnapShot => {
  const game: IGameSesion = app.service('game-session').get(game_session_id);
  const player_objects = game.player_inputs.map(elem => elem?.app.player_data)
  const bullet_objects = game.player_inputs.map(elem => elem?.app.bullets_data)
  const selected = game.player_inputs.map(elem => elem?.app.client_selected)
  const ended = game.player_inputs.map(elem => elem ? elem.app.player_data.hp <= 0 : false).every(elem => elem === true)
  return {
    game_can_start: game.players_selected.length >= game.min_player,
    players_selected: selected,
    players_objects: player_objects,
    bullet_objects: bullet_objects,
    game_ended: ended,
    session_name: game.game_session,
    type: 'backend'
  };
};

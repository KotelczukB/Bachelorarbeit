import { IGameSesion } from "../models/IGameSession";
import { _BasicState } from "../models/_SessionState";
import { IGameSessionCreation } from "../models/IGameData";
import app from "../app";
import { Application, Paginated } from "@feathersjs/feathers";
import { IRTServer } from "../models/IRTServer";

// Create State of GameSession !
export default (data: IGameSessionCreation, rt_server: IRTServer): IGameSesion => {
  return {
    name: `game_${data.game_session}`,
    min_player: app.get('min_players'),
    state: _BasicState.active,
    game_session: data.game_session,
    rt_server: rt_server,
    player_tokens: [data.token],
    players_selected: [],
    player_inputs: [],
  };
};

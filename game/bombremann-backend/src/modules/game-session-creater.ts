import { IGameSesion } from "../models/IGameSession";
import { _BasicState } from "../models/_SessionState";
import { IGameSessionCreation } from "../models/IGameSessionCreation";
import app from "../app";
import { IRTServer } from "../models/IRTServer";

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
    player_won: false,
    newest_at: 0
  };
};
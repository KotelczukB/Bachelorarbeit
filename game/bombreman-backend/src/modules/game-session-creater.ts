import { IGameSesion } from "../models/IGameSession";
import { _BasicState } from "../models/_SessionState";
import { IGameSessionCreation } from "../models/IGameData";
import app from "../app";
import { Application, Paginated } from "@feathersjs/feathers";
import { IRTServer } from "../models/IRTServer";

// Create State of GameSession !
export default (data: IGameSessionCreation, rt_server: IRTServer): IGameSesion => {
  return {
    name: `game_${data.game_channel}`,
    min_player: app.get('min_players'),
    state: _BasicState.active,
    game_channels: [data.game_channel],
    rt_server: [rt_server],
    player_tokens: [data.token],
    chars_in_use: [],// data.own_game_snapshots.map((elem) => elem.selected_char),
    player_inputs: [],
  };
};

import { IGameSesion } from "../models/IGameSession";
import { _BasicState } from "../models/_SessionState";
import { IGameData } from "../models/IGameData";

export default (data: IGameData): IGameSesion => {
  return {
    name: `game_${data.rt_session}`,
    min_player: 3,
    state: _BasicState.active,
    rt_session: [data.rt_session],
    rt_serverURL: [data.rt_serverURL],
    player_tokens: data.tokens,
    chars_in_use: data.own_game_snapshots.map((elem) => elem.selected_char),
    player_inputs: [],
  };
};

import { _BasicState } from "./_SessionState";
import { IRTServer } from "./IRTServer";
import { IPlayerInput, IClientInput } from "./IPlayerInput";

export interface IGameSesion {
  name: string;
  player_won: boolean;
  min_player: number;
  state: _BasicState;
  game_session: string;
  rt_server: IRTServer;
  player_tokens: string[];
  players_selected: (string | undefined)[];
  player_inputs: (IClientInput | null)[];
  newest_at: number;
  [idx: string]: any
}
import { _BasicState } from "./_SessionState";
import { IRTServer } from "./IRTServer";
import { IPlayerInput, IClientInput } from "./IPlayerInput";

export interface IGameSesion {
  name: string;
  min_player: number;
  state: _BasicState;
  game_session: string;
  rt_server: IRTServer;
  player_tokens: string[];
  players_selected: (string | undefined)[];
  player_inputs: (IClientInput | null)[];
  [idx: string]: any
}
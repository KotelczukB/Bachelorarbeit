import { _BasicState } from "./_SessionState";
import { IRTServer } from "./IRTServer";
import { IPlayerGameState } from "./IPlayerGameState";

export interface IGameSesion {
  name: string;
  min_player: number;
  state: _BasicState;
  game_session: string;
  rt_server: IRTServer;
  player_tokens: string[];
  players_selected: number[];
  player_inputs: IPlayerGameState[];
  [idx: string]: any
}
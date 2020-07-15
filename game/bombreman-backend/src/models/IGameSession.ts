import { _BasicState } from "./_SessionState";
import { IRTServer } from "./IRTServer";
import { IPlayerGameState } from "./IPlayerGameState";

export interface IGameSesion {
  name: string;
  min_player: number;
  state: _BasicState;
  game_channels: string;
  rt_server: IRTServer[];
  player_tokens: string[];
  chars_in_use: number[];
  player_inputs: IPlayerGameState[];
  [idx: string]: any
}
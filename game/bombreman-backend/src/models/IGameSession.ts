import { _BasicState } from "./_SessionState";
import { IRTServer } from "./IRTServer";
import { IPlayerGameState } from "./IPlayerGameState";

export interface IGameSesion {
  name: string;
  min_player: number;
  state: _BasicState;
  rt_session: string[];
  rt_serverURL: IRTServer[];
  player_tokens: string[];
  chars_in_use: number[];
  player_inputs: IPlayerGameState[];
}
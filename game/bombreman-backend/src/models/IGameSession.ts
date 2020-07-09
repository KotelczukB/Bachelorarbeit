import { _BasicState } from "./SessionState";
import { IPlayerGameState } from "./IPlayerInputDTO";
import { IRTServer } from "./IRTServer";

export interface IGameSesion {
  name: string;
  state: _BasicState;
  rt_session: string[];
  rt_serverURL: IRTServer[];
  player_tokens: string[];
  chars_in_use: number[];
  player_inputs: IPlayerGameState[];
}
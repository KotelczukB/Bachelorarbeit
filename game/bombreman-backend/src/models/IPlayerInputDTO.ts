import { IGameOnLoginResponse } from "./IPlayerDTO";
import { IRTServer } from "./IRTServer";

export interface IPlayerInputDTO {
  app_data: IApplicationData;
  [idx: string]: any;
}

export interface IApplicationData {
  own_game_snapshots: IPlayerGameState[];
  backend_data: IGameOnLoginResponse;
  rt_session: string;
  rt_serverURL: IRTServer;
  tokens: string[];
}

export interface IPlayerGameState {
  player_data: any;
  player_bullets: any;
  selected_char: number;
}
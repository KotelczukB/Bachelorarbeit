import { IUsedChars } from "./IUsedChars";
import { IRTServer } from "./IRTServer";
import { IPlayerGameState } from "./IPlayerGameState";

export interface IGameData {
  own_game_snapshots: IPlayerGameState[];
  game_channel: string;
  chars: IUsedChars;
  rt_session: string;
  rt_serverURL: IRTServer;
  tokens: string[];
}

export interface IGameSessionCreation {
  game_channel: string;
  rt_serverURL: string;
  token: string;
}
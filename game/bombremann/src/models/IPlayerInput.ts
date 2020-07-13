import { IUsedChars } from "./IUsedChars";

export interface IPlayerInput {
  backend_data: IGameData;
  rt_session: string;
  id: string;
  user_name: string;
  password: string;
  token: string;
}

export interface IGameData { 
  game_session: string;
  chars: IUsedChars; 
}
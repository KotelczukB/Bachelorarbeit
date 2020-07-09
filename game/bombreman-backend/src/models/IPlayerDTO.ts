export interface IPlayerDTO {
  id: string;
  user_name: string;
  password: string;
  token: string;
}

export interface IGameOnLoginResponse {
  game_session: string;
  chars: IUsedChars;
}

export interface IUsedChars {
  1: boolean;
  2: boolean;
  3: boolean;
  4: boolean;
  [idx: number]: boolean;
}

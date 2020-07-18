import { _ExternType } from "../_ExternType";

export interface IBackendResponse {
  [idx: string]: any;
  created_at: number;
  ping: number;
  type: _ExternType;
  game_can_start: boolean;
  game_started: boolean
  game_ended: boolean;
  player_won: boolean;
  session_name: string;
  message: string;
}

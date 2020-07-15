import { _ExternType } from "../_ExternType";

export interface IBackendInput {
  [idx: string]: any;
  created_at: number;
  type: _ExternType;
  game_can_start: boolean;
  game_started: boolean
  game_ended: boolean;
  session_name: string;
  message: string;
}

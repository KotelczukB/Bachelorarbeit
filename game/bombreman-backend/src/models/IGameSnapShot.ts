import { IPlayerObject } from "./GameObjects/IPlayerObject";
import { IBulletObject } from "./GameObjects/IBulletObject";

export interface IGameSnapShot {
  players_selected: (string | undefined)[];
  players_objects: (IPlayerObject | undefined)[];
  bullet_objects: (IBulletObject | undefined)[];
  game_ended: boolean;
  game_started: boolean;
  game_can_start: boolean;
  session_name: string;
  type: string;
  created_at: number;
  newest_at: number;
}

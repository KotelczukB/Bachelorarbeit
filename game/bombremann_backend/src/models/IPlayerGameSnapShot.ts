import { IPlayerObject } from "./GameObjects/IPlayerObject";
import { IBulletObject } from "./GameObjects/IBulletObject";

export interface IPlayerGameSnapShot {
  player_data: IPlayerObject;
  client_selected: string;
  bullets_data: IBulletObject;
  player_won: boolean;
}

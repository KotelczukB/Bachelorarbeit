import { IGameData } from "./IGameData";

export interface IPlayerInputDTO {
  app_data: IGameData;
  [idx: string]: any;
}

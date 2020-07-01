import { IGameData } from "../clients-inputs/IGameData";

export interface IBackendInput {
  gameState: IGameData;
  ownURL: string;
  session_name: string;
}
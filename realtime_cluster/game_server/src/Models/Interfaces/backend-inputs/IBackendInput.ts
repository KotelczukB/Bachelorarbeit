import { IGameData } from "../clients-inputs/IGameData";
import { IExternType } from "../IExternType";

export interface IBackendInput {
  type: IExternType;
  gameState: IGameData;
  ownURL: string;
  session_name: string;
  traget_channel_name: string;
}
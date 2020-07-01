import { IVarGameData } from "./IVarGameData";
import { IConstGameData } from "./IConstGameData";

export interface IGameData {
  variable: IVarGameData
  constant: IConstGameData
}
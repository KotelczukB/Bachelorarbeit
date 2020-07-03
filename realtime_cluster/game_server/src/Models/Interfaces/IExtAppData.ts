import { IVarExtAppData } from "./IVarExtAppData";
import { IChatExtAppData } from "./IChatExtAppData";
import { IConstExtAppData } from "./IConstExtAppData";


export interface IExternalAppData {
  variable: IVarExtAppData;
  chatData: IChatExtAppData;
  constant: IConstExtAppData;
  [idx: string]: any;
}

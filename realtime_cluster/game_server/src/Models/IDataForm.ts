import { IUser } from "./Interfaces/IUser";

// Model der Standarisierten Schnittstelle
export default interface IDataForm {
  user: IUser,
  message: string,
  [idx: string]: object | string | boolean
}
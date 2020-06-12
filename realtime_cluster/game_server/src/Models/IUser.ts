import { ERoles } from "./ERoles";

export interface IUser {
  id: number,
  ip_adress: string,
  role: ERoles
  Barer: string
}
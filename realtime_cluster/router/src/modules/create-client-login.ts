import { IClientLogin } from "../models/IClientLogin";
import { IClientDTO } from "../models/IClientDTO";

export default (data: IClientLogin): IClientDTO => {
  return {
    id: data.id,
    user_name: data.user_name,
    password: data.password,
    token: null
   }
}